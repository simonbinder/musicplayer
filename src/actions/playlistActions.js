import {
  SAVE_PLAYLISTS_INITIAL,
  SAVE_PLAYLIST,
  REMOVE_PLAYLIST,
  UPDATE_PLAYLIST,
  PLAY_TRACK,
  SHUFFLE_STATE_CHANGED,
  TRACK_PROGRESS,
  CHANGE_PLAYSTATUS
} from '../consts/playlistConsts';
//
export function changePlayStatus() {
  return {
    type: CHANGE_PLAYSTATUS,
  };
};
//
export function pauseCurrentSong() {
  return (dispatch, getState) => {
    window.audioManager.pause();
    dispatch(changePlayStatus());
  };
};
//
export function playCurrentSong() {
  return (dispatch, getState) => {
    window.audioManager.play();
    dispatch(changePlayStatus());
  };
}
//
export function playNextSong() {
  return (dispatch, getState) => {
    let activeTrack = getState().playlist.activeTrack;
    if(activeTrack) {
      getNextSong(dispatch, getState, 'next');
    }
  };
};
//
export function playPreviousSong() {
  return (dispatch, getState) => {
    let activeTrack = getState().playlist.activeTrack;
    if(activeTrack) {
      getNextSong(dispatch, getState, 'previous');
    }
  };
};
//
export function setNewActiveSong(track, activeContainer) {
  return {
    type: PLAY_TRACK,
    payload: {
      track: track,
      activeContainer: activeContainer,
    },
  };
};
//
export function setTrackProgress(progress) {
  return {
    type: TRACK_PROGRESS,
    payload: progress,
  };
};

export function startNewSong(track, activeContainer) {
  return (dispatch, getState) => {
    //set new ative track
    dispatch(setNewActiveSong(track, activeContainer));

    if(track.source) {
      window.audioManager.src = track.source;
      //window.audioManager.play();
      dispatch(playCurrentSong());
      window.audioManager.ontimeupdate = () => {
        let duration = window.audioManager.duration;
        let currentTime = window.audioManager.currentTime;
        let progress = currentTime / duration;
        dispatch(setTrackProgress(progress.toFixed(2)));
      };
      window.audioManager.onended = () => {
        //reset progress
        dispatch(setTrackProgress(0));
        //get state
        getNextSong(dispatch, getState, 'next');
      };
    } else {
      getNextSong(dispatch, getState, 'next');
    }
  };
};

function getNextSong(dispatch, getState, direction) {
  let playlistState = getState().playlist;
  let {
    activeContainer,
    activeTrack,
  } = playlistState;

  if(activeContainer.length > 0) {
    let index = activeContainer.findIndex(item => item._id == activeTrack._id);
    if(index != -1) {
      if(index == activeContainer.length - 1) {
        //last one
        //let nextIndex = direction == 'next' ? 0 : index - 1;
        dispatch(startNewSong(activeContainer[ direction == 'next' ? 0 : index - 1], activeContainer));
      } else {
        dispatch(startNewSong(activeContainer[ direction == 'next' ? index + 1 : index - 1], activeContainer));
      }
    }
  }
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
    fetch('http://localhost:4000/playlists/' + playlistId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        trackId: track._id,
      }),
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        dispatch(updatePlaylist(response.playlist));
      }
    })
    .catch(error => {
      console.log('Error deleting track', error);
    })
  };
};
