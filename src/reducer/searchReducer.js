import {
  SEARCH_VALUE_CHANGED,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_ERROR
} from '../consts/searchConsts';

const initialState = {
  searchValue: '',
  tracks: [],
  error: '',
};

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_VALUE_CHANGED:
      state.searchValue = action.payload;
      return state;
    case SEARCH_TRACKS_SUCCESS:
      state.tracks = action.payload;
      return state;
    case SEARCH_TRACKS_ERROR:
      state.error = action.payload;
      return state;
    default:
      return state;
  }
};
