import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
} from '../consts/playlistConsts';
//
export function savePlaylistsInitial(playlists) {
  return {
    type: SAVE_PLAYLISTS_INITIAL,
    payload: playlists,
  };
};

export function saveNewPlaylist(playlist) {
  return {
    type: SAVE_PLAYLIST,
    payload: playlist,
  };
};

//
export function createNewPlaylist(userId, name) {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        name: name,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        dispatch(saveNewPlaylist(response.playlist));
      }
    })
    .catch(error => {
      console.log('Error creating new playlist', error);
    })
  };
};
