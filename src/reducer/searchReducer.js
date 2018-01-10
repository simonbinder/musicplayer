import {
  SEARCH_VALUE_CHANGED,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_ERROR
} from '../consts/searchConsts';

const initialState = {
  searchValue: '',
  tracks: [],
  error: null,
};

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_VALUE_CHANGED:
      return Object.assign({}, state, {
        searchValue: action.payload,
      });
    case SEARCH_TRACKS_SUCCESS:
      return Object.assign({}, state, {
        tracks: action.payload,
        error: null,
      });
    case SEARCH_TRACKS_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        tracks: [],
      });
    default:
      return state;
  }
};
