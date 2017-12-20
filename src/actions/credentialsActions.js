import {
  SAVE_SPOTIFY_ACCESS_TOKEN
} from '../consts/credentialsConsts';

export function saveSpotifyAccessToken(token) {
  return {
    type: SAVE_SPOTIFY_ACCESS_TOKEN,
    payload: token,
  };
};
