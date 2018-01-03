import searchReducer from '../searchReducer';
import {SEARCH_VALUE_CHANGED, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR} from '../../consts/searchConsts';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual({searchValue: '', tracks: [], error: ''})
  })

  it('search entered', () => {
    expect(searchReducer({}, {
      type: SEARCH_VALUE_CHANGED,
      payload: "Test"
    })).toEqual({searchValue: 'Test'})
  })

  it('search successful', () => {
    expect(searchReducer({}, {
      type: SEARCH_TRACKS_SUCCESS,
      payload: "Test"
    })).toEqual({tracks: 'Test'})
  })

  it('search error', () => {
    expect(searchReducer({}, {
      type: SEARCH_TRACKS_ERROR,
      payload: "Test"
    })).toEqual({error: 'Test'})
  })
})
