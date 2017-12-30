import {
  SAVE_SPOTIFY_ACCESS_TOKEN,
  SAVE_USER,
  RESET_CREDENTIALS,
} from '../consts/credentialsConsts';

const initialState = {
  spotifyAccessToken: null,
  user: {},
};

export default function credentialsReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_SPOTIFY_ACCESS_TOKEN:
      state.spotifyAccessToken = action.payload;
      return state;
    case SAVE_USER:
      state.user = action.payload;
      return state;
    case RESET_CREDENTIALS:
      return initialState;
    default:
      return state;
  }
};
