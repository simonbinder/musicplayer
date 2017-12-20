import {
  SEARCH_VALUE_CHANGED
} from '../consts/searchConsts';

export function searchValueChanged(value) {
  return {
    type: SEARCH_VALUE_CHANGED,
    payload: value,
  };
};
