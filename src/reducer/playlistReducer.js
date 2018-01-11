import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
  REMOVE_PLAYLIST,
  PLAY_TRACK,
  SHUFFLE_STATE_CHANGED,
  UPDATE_PLAYLIST
} from '../consts/playlistConsts';

const initialState = {
  playStatus: 'paused',
  activeTrack: null,
  playlists: [],
  shuffle: false,
};

export default function playlistReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_PLAYLISTS_INITIAL:
      return Object.assign({}, state, {
        playlists: action.payload,
      });
    case SAVE_PLAYLIST:
      return Object.assign({}, state, {
        playlists: state.playlists.concat(action.payload),
      });
    case REMOVE_PLAYLIST:
      return Object.assign({}, state, {
        playlists: state.playlists.filter(playlist => {
          return playlist._id != action.payload; //its an id
        }),
      });
    case PLAY_TRACK:
      return Object.assign({}, state, {
        activeTrack: action.payload,
      });
    case SHUFFLE_STATE_CHANGED:
      return Object.assign({}, state, {
        shuffle: !state.shuffle,
      });
    case UPDATE_PLAYLIST:
      let index = state.playlists.findIndex(item => item._id == action.payload._id);

      if(index == -1) {
        return state;
      }

      return Object.assign({}, state, {
        playlists: state.playlists.map((playlist, i) => {
          if(i == index) {
            return action.payload;
          }

          return playlist;
        })
      });
    default:
      return state;
  }
};
