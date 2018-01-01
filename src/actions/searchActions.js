import {
  SEARCH_VALUE_CHANGED,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_ERROR,
} from '../consts/searchConsts';
import { push } from 'react-router-redux';

export function searchSuccess(tracks) {
  return {
    type: SEARCH_TRACKS_SUCCESS,
    payload: tracks,
  };
};

export function searchError(error) {
  return {
    type: SEARCH_TRACKS_ERROR,
    payload: error,
  };
};

export function searchValueChanged(value) {
  return (dispatch, getState) => {
    //change search value
    dispatch({
      type: SEARCH_VALUE_CHANGED,
      payload: value,
    });

    //go to indexpage
    dispatch(push('/'));

    const accessToken = getState().credentials.spotifyAccessToken;
    fetch('http://localhost:4000/spotify/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        q: value,
      })
    })
    .then(response => response.json())
    .then(response => {
      dispatch(searchSuccess(response.tracks));
    })
    .catch(error => {
      dispatch(searchError(error));
    });
  };
};
