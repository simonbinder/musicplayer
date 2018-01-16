import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
  REMOVE_PLAYLIST,
  PLAY_TRACK,
  SHUFFLE_STATE_CHANGED,
  UPDATE_PLAYLIST,
  TRACK_PROGRESS,
  CHANGE_PLAYSTATUS
} from '../consts/playlistConsts';

const initialState = {
  playStatus: false, //true or false
  activeTrack: null,
  playlists: [],
  shuffle: false,
  progress: 0,
  activeContainer: [],
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
        activeTrack: action.payload.track,
        activeContainer: action.payload.activeContainer,
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
    case TRACK_PROGRESS:
      return Object.assign({}, state, {
        progress: action.payload,
      });
    case CHANGE_PLAYSTATUS:
      return Object.assign({}, state, {
        playStatus: !state.playStatus,
      });
    default:
      return state;
  }
};
