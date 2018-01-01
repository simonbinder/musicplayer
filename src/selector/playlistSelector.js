//
export function selectPlaylist(playlists, id) {
  return playlists.filter(playlist => {
    return playlist._id == id;
  })[0];
};
