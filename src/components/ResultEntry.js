import React from 'react';
import '../assets/ResultEntry.scss';
import Tooltip from './Tooltip';

const ResultEntry = props => {

  const { origin, title, artists, imageUrl } = props;

  let classes = 'col-md-12 o-result-entry';
  if(origin === 'soundcloud') {
    classes += ' o-result-entry--soundcloud';
  }
  if(origin === 'youtube') {
    classes += ' o-result-entry--youtube';
  }

  if(origin === 'spotify') {
    classes += ' o-result-entry--spotify';
  }

  const items = props.playlists.map(playlist => {
    return {
      onClick: () => props.onTrackAdd(playlist._id, title, artists, origin),
      title: playlist.name,
    };
  })

  return <div className={classes}>
    <img src={imageUrl} />
    <div className="o-result-entry__body">
      <p>{title}</p>
      <p>{artists}</p>
    </div>
    <div className="o-result-entry__controls">
      <div className="o-result-entry__icon o-result-entry__play"></div>
      <div className="o-result-entry__icon o-result-entry__add">
        <Tooltip items={items} />
      </div>
    </div>
  </div>
};

export default ResultEntry;
