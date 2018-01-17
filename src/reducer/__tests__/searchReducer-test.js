import searchReducer from '../searchReducer';
import {SEARCH_VALUE_CHANGED, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR} from '../../consts/searchConsts';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toMatchSnapshot();
  })

  it('search entered', () => {
    expect(searchReducer({}, {
      type: SEARCH_VALUE_CHANGED,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('search successful', () => {
    expect(searchReducer({}, {
      type: SEARCH_TRACKS_SUCCESS,
      payload: "Test"
    })).toMatchSnapshot();
  })

  it('search error', () => {
    expect(searchReducer({}, {
      type: SEARCH_TRACKS_ERROR,
      payload: "Test"
    })).toMatchSnapshot();
  })
})
