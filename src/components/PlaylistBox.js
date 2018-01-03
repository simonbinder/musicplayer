import React from 'react';
import '../assets/PlaylistBox.scss';
import { Link } from 'react-router';

const PlaylistBox = props => {

  const {
    id,
    name,
    onDelete
  } = props;

  return <div className="col-md-12 o-playlist-box">
    <div className="o-playlist-box__body">
      <Link to={ '/playlist?id=' + id }>
        <h2 className="o-playlist-box__title">{name}</h2>
      </Link>
    </div>
    <div className="o-playlist-box__controls">
      <span onClick={ onDelete }>Delete</span>
    </div>
  </div>
};

export default PlaylistBox;
