import playlistReducer from '../playlistReducer'
import
import {SAVE_PLAYLISTS_INITIAL, SAVE_PLAYLIST, REMOVE_PLAYLIST, PLAY_TRACK} from '../../consts/playlistConsts';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(playlistReducer(undefined, {})).toEqual({activeTrack: null, playlists: []})
  })

  // it('save initial playlist', () => {
  //   expect(searchReducer({}, {
  //
  //     type: SAVE_PLAYLISTS_INITIAL,
  //     payload: "Test"
  //   })).toEqual({searchValue: 'Test'})
  // })
  //
  // it('search successful', () => {
  //   expect(searchReducer({}, {
  //     type: SEARCH_TRACKS_SUCCESS,
  //     payload: "Test"
  //   })).toEqual({tracks: 'Test'})
  // })
  //
  // it('search error', () => {
  //   expect(searchReducer({}, {
  //     type: SEARCH_TRACKS_ERROR,
  //     payload: "Test"
  //   })).toEqual({error: 'Test'})
  // })
})
