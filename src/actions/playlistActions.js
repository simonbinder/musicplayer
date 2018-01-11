import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
  REMOVE_PLAYLIST,
  UPDATE_PLAYLIST,
  PLAY_TRACK,
  SHUFFLE_STATE_CHANGED
} from '../consts/playlistConsts';
//
export function pauseCurrentSong() {
  window.audioManager.pause();
};

export function playNextSong() {
  return (dispatch, getState) => {
    let state = getState();
  };
};

export function playPreviousSong() {
  return (dispatch, getState) => {
    let state = getState();
  };
};

//
export function setNewActiveSong(track) {
  return {
    type: PLAY_TRACK,
    payload: track,
  };
};

export function startNewSong(track) {
  return (dispatch, getState) => {
    //set new ative track
    dispatch(setNewActiveSong(track));

    window.audioManager.src = track.source;
    window.audioManager.play();
  };
};

//
export function savePlaylistsInitial(playlists) {
  return {
    type: SAVE_PLAYLISTS_INITIAL,
    payload: playlists,
  };
};
//
export function saveNewPlaylist(playlist) {
  return {
    type: SAVE_PLAYLIST,
    payload: playlist,
  };
};
//
export function removePlaylist(id) {
  return {
    type: REMOVE_PLAYLIST,
    payload: id,
  };
};
//
export function updatePlaylist(playlist) {
  return {
    type: UPDATE_PLAYLIST,
    payload: playlist,
  };
};
//
export function changeShuffleState() {
  return {
    type: SHUFFLE_STATE_CHANGED,
  };
};
//
export function requestRemovePlaylist(id) {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/playlists', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        dispatch(removePlaylist(id));
      }
    })
    .catch(error => {
      console.log('Error deleting playlist', error);
    })
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

//save track in playlist
export function requestSaveTrack(playlistId, title, artists, origin, source) {
  return (dispatch, getState) => {
    fetch('http://localhost:4000/playlists/' + playlistId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        origin: origin,
        title: title,
        artists: artists,
        source: source,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        //TODO
      }
    })
    .catch(error => {
      console.log('Error saving track', error);
    })
  };
};

export function removeTrackFromPlaylist(playlistId, track) {
  return (dispatch, getState) => {

  };
};
