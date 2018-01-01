import React from 'react';
import '../assets/PlaylistBox.scss';

const PlaylistBox = props => {

  const {
    name
  } = props;

  return <div className="col-md-12 o-playlist-box">
    <h2>{name}</h2>
  </div>
};

export default PlaylistBox;
