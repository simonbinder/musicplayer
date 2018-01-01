import React from 'react';
import '../assets/TrackBox.scss';

const TrackBox = props => {

  const {
    title,
    artists,
    onPlay
  } = props;

  return <div className="o-track-box" onClick={ onPlay }>
    <span>{title}</span>
    <span>{artists}</span>
  </div>
};

export default TrackBox;
