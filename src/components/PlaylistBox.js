import React from 'react';
import '../assets/PlaylistBox.scss';
import { Link } from 'react-router';

const PlaylistBox = props => {

  const {
    id,
    name,
    onDelete
  } = props;

  return <div className="col-md-3 col-sm-6 o-playlist-box">


      <div className="o-playlist-box__body">

      <Link to={ '/playlist?id=' + id }>
        <div className="o-playlist-box__linkcontent">
          <div className="o-playlist-box__logo o-playlist_icon"></div>
          </div>
          </Link>
          <div className="o-playlist-box__controls o-delete_icon">
            <span
            className="glyphicon glyphicon-remove-circle"
            onClick={ onDelete }></span>
          </div>

        </div>
    <h2 className="o-playlist-box__title">{name}</h2>

  </div>
};

export default PlaylistBox;
