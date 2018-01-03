import {
  SAVE_SPOTIFY_ACCESS_TOKEN,
  SAVE_USER,
  RESET_CREDENTIALS,
} from '../consts/credentialsConsts';

const initialState = {
  spotifyAccessToken: null,
  user: null,
};

export default function credentialsReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_SPOTIFY_ACCESS_TOKEN:
      return Object.assign({}, state, {
        spotifyAccessToken: action.payload,
      });
    case SAVE_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case RESET_CREDENTIALS:
      return initialState;
    default:
      return state;
  }
};
