import React from 'react';
import '../assets/Tag.scss';

const Tag = props => {

  const { text, origin } = props;
  let classes = "o-tag";
  if(origin == 'spotify') {
    classes += " o-tag--spotify";
  }

  return <div className={classes}>
    {text}
  </div>
};

export default Tag;
