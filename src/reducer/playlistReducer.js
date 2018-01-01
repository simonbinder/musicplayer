import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
} from '../consts/playlistConsts';

const initialState = {
  playlists: [],
};

export default function playlistReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_PLAYLISTS_INITIAL:
      return Object.assign({}, state, {
        playlists: action.payload,
      });
    case SAVE_PLAYLIST:
      return Object.assign({}, state, {
        playlists: state.playlists.push(action.payload),
      });
    default:
      return state;
  }
};
