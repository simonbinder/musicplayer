import {
  SAVE_SPOTIFY_ACCESS_TOKEN
} from '../consts/credentialsConsts';

const initialState = {
  spotifyAccessToken: null,
};

export default function credentialsReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_SPOTIFY_ACCESS_TOKEN:
      state.spotifyAccessToken = action.payload;
      return state;
    default:
      return state;
  }
};
