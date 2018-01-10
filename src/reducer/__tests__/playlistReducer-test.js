import playlistReducer from '../playlistReducer'
import {SAVE_PLAYLISTS_INITIAL, SAVE_PLAYLIST, REMOVE_PLAYLIST, PLAY_TRACK} from '../../consts/playlistConsts';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(playlistReducer(undefined, {})).toMatchSnapshot();
  })

  it('save initial playlist', () => {
    expect(playlistReducer({}, {
      type: SAVE_PLAYLISTS_INITIAL,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('play track', () => {
    expect(playlistReducer({}, {
      type: PLAY_TRACK,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('save playlist', () => {
    const initialState = {
      activeTrack: null,
      playlists: "test"
    };
    expect(playlistReducer(initialState, {
      type: SAVE_PLAYLIST,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('remove playlist', () => {
    const initialState = {
      activeTrack: null,
      playlists: [
        {
          _id: 1,
          name: "test"
        }, {
          _id: 2,
          name: "test2"
        }
      ]

    };
    expect(playlistReducer(initialState, {
      type: REMOVE_PLAYLIST,
      payload: 2
    })).toMatchSnapshot();
  })
})
