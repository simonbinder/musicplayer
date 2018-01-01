import React from 'react';
import '../assets/TrackBox.scss';

const TrackBox = props => {

  const {
    title,
    artists,
  } = props;

  return <div className="o-track-box">
    <p>{title}</p>
    <p>{artists}</p>
  </div>
};

export default TrackBox;
