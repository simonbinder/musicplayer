const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');

//reference: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
const client_id = 'cc619e7378f74f8483c7d46125c413f9';
const client_secret = '7e598850f84343f7a83b25fc61f9dc63';
const redirect_uri = 'http://localhost:4000/spotify/callback';
const stateKey = 'spotify_auth_state';

const generateRandomString = length => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', (req, res) => {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:8080/settings?' +
      querystring.stringify({
        api: 'spotify',
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        // request.get(options, function(error, response, body) {
        //   console.log(body);
        // });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:8080/settings?' + querystring.stringify({
          api: 'spotify',
          access_token: access_token,
          refresh_token: refresh_token
        }));
      } else {
        res.redirect('http://localhost:8080/settings?' +
          querystring.stringify({
            api: 'spotify',
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.post('/refresh_token', (req, res) => {

  let refresh_token = req.body.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {

    console.log('Body after requesting access token', body);

    if(error) {
      console.log('send error');
      return res.status(200).json({
        error: error,
      });
    } else {
      if(body.error) {
        return res.status(401).json({
          error: body.error,
          description: body.error_description,
        });
      } else {
        let access_token = body.access_token;
        return res.json({
          'access_token': access_token,
        });
      }
    }
  });
});

router.get('/me', (req, res) => {
  return res.json({
    success: true,
  });
});

router.post('/search', (req, res) => {
  console.log('req body', req.body);

  let access_token = req.body.access_token;

  let options = {
    url: 'https://api.spotify.com/v1/search',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true,
    qs: {
      'type': 'track',
      'q': req.body.q,
    },
  };

  request.get(options, (error, response, body) => {
    console.log('Body', body);
    if(error) {
      return res.json(error);
    } else {

      let tracks = [];
      if(body.tracks) {
        
        let { items } = body.tracks;

        if(items) {
          tracks = body.tracks.items.map((track) => {
            return {
              origin: 'spotify',
              title: track.name,
              image: track.images ? track.images[0].url : '',
              artists: track.artists.map((artist) => {
                return artist.name;
              }).join(', '),
              id: track.id,
              source: track.preview_url,
            };
          });
        }
      }

      return res.json({
        tracks: tracks,
      });
    }
  });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Spotify = require('spotify-web-api-node');
//
// const scopes = ['user-read-private', 'user-read-email'];
// const STATE_KEY = 'spotify_auth_state';
// const spotifyApi = new Spotify({
//   clientId: 'cc619e7378f74f8483c7d46125c413f9',
//   clientSecret: '7e598850f84343f7a83b25fc61f9dc63',
//   redirectUri: 'http://localhost:4000/spotify/callback'
// });
//
// const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
//
// router.get('/login', (_, res) => {
//   console.log("redirecting...");
//   const state = generateRandomString(16);
//   res.cookie(STATE_KEY, state);
//   res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
// });
//
// router.get('/callback', (req, res) => {
//   console.log("in callback...")
//   const { code, state } = req.query;
//   const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
//   // first do state validation
//   if (state === null || state !== storedState) {
//     res.redirect('/#/error/state mismatch');
//   // if the state is valid, get the authorization code and pass it on to the client
//   } else {
//     res.clearCookie(STATE_KEY);
//     // Retrieve an access token and a refresh token
//     spotifyApi.authorizationCodeGrant(code).then(data => {
//       const { expires_in, access_token, refresh_token } = data.body;
//
//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(access_token);
//       spotifyApi.setRefreshToken(refresh_token);
//
//       // use the access token to access the Spotify Web API
//       spotifyApi.getMe().then(({ body }) => {
//         console.log(body);
//       });
//
//       // we can also pass the token to the browser to make requests from there
//       res.redirect(`/settings}`);
//     }).catch(err => {
//       res.redirect('/#/error/invalid token');
//     });
//   }
// });
//
// module.exports = router;
