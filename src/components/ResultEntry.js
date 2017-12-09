import React from 'react';
import '../assets/ResultEntry.scss';

const ResultEntry = props => {

  const {
    origin,
  } = props;

  let classes = 'col-md-12 o-result-entry';
  if(origin === 'soundcloud') {
    classes += ' o-result-entry--soundcloud';
  }
  if(origin === 'youtube') {
    classes += ' o-result-entry--youtube';
  }

  return <div className={classes}>
    ResultEntry
  </div>
};

export default ResultEntry;
