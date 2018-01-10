import React from 'react';
import '../assets/TrackBox.scss';

const TrackBox = props => {

  const {
    title,
    artists,
    onPlay
  } = props;

  return <div className="o-track-box">
    <span>
      <div className="o-track-box__buttoncontainer">
        <div
          onClick={ onPlay }
          className="o-track-box-button o-track-box-button-play">
        </div>
      </div>
    </span>
    <span>{title}</span>
    <span>{artists}</span>
    <span>Spotify</span>
    <span
      className="o-track-box__remove-button glyphicon glyphicon-remove-circle">
    </span>
  </div>
};

export default TrackBox;
