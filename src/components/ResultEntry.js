import React from 'react';
import '../assets/ResultEntry.scss';

const ResultEntry = props => {

  const {
    origin,
    title,
    artists
  } = props;

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

  return <div className={classes}>
    <div className="o-result-entry__body">
      <p>{title}</p>
      <p>{artists}</p>
    </div>
    <div className="o-result-entry__controls">
      Controls
    </div>
  </div>
};

export default ResultEntry;
