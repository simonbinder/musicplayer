import React from 'react';
import '../assets/ResultEntry.scss';
import Tooltip from './Tooltip';

const ResultEntry = props => {

  const { origin, title, artists, imageUrl, source } = props;

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
      onClick: () => props.onTrackAdd(playlist._id, title, artists, origin, source),
      title: playlist.name,
    };
  })

  return <div className={classes}>
    <img src={imageUrl} />
    <div className="o-result-entry__body">
      <p>{title}</p>
      <p>{artists}</p>
    </div>

    <div className="o-result-entry__buttoncontainer">
      <div
        className="o-result-entry-button o-result-entry-button-play">
      </div>
      <div
        className="o-result-entry-button o-result-entry-button-add">
        <Tooltip items={items} />
      </div>
    </div>
  </div>
};

export default ResultEntry;
