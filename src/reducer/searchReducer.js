import {
  SEARCH_VALUE_CHANGED
} from '../consts/searchConsts';

const initialState = {
  searchValue: '',
};

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_VALUE_CHANGED:
      state.searchValue = action.payload;
      return state;
    default:
      return state;
  }
};
