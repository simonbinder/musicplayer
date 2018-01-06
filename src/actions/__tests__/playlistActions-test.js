import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../playlistActions'
import {SAVE_PLAYLISTS_INITIAL, SAVE_PLAYLIST, REMOVE_PLAYLIST, UPDATE_PLAYLIST, PLAY_TRACK} from '../../consts/playlistConsts';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe.skip('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates SAVE_PLAYLIST after POST is done', () => {
    fetchMock.postOnce('http://localhost:4000/playlists', {
      body: {
        "id": "5a4a96c814c59c00c4f651ef",
        "name": "Test-Playlist"
      },
      headers: {
        'content-type': 'application/json'
      }
    }).catch();

    const expectedActions = [
      {
        type: SAVE_PLAYLIST
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.createNewPlaylist()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
