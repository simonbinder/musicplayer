import searchReducer from '../searchReducer'
import {SEARCH_VALUE_CHANGED, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR} from '../../consts/searchConsts';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual({searchValue: '', tracks: [], error: ''})
  })

  
})
