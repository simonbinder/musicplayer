import {
  SAVE_SPOTIFY_ACCESS_TOKEN,
  SAVE_USER,
  RESET_CREDENTIALS
} from '../consts/credentialsConsts';

export function saveSpotifyAccessToken(token) {
  return {
    type: SAVE_SPOTIFY_ACCESS_TOKEN,
    payload: token,
  };
};

export function saveUser(user) {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export function resetCredentials() {
  return {
    type: RESET_CREDENTIALS,
  };
};

export function verifySpotifyRefreshToken() {
  return (dispatch, getState) => {
    //get the refresh token from localStorage
    let refreshToken = localStorage.getItem('spotifyRefreshToken');

    if(refreshToken) {
      console.log('Refresh token is there');
      fetch('http://localhost:4000/spotify/refresh_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      })
      .then(response => response.json())
      .then(response => {
        console.log('Refresh token:', response);
        if(response.access_token) {
          dispatch(saveSpotifyAccessToken(response.access_token));
        }
      })
      .catch(err => {
        console.log('Refresh token err:', err);
      })
    }
  };
};
