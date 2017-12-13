const express = require('express');
const router = express.Router();
const Spotify = require('spotify-web-api-node');

const scopes = ['user-read-private', 'user-read-email'];
const STATE_KEY = 'spotify_auth_state';
const spotifyApi = new Spotify({
  clientId: '8eebe6e99b2246c1ba9b4a6ddc7ebd0d',
  clientSecret: '0a644de940c6426ab838a1aa9dfbc5d2',
  redirectUri: 'localhost:4000/spotify/callback'
});
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

router.get('/login', (_, res) => {
  console.log("redirecting...");
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

router.get('/callback', (req, res) => {
  console.log("in callback...")
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log(body);
      });

      // we can also pass the token to the browser to make requests from there
      res.redirect(`/settings}`);
    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  }
});

module.exports = router;
