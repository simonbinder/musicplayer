import React from 'react';
import { connect } from 'react-redux';
import PlaylistBox from '../components/PlaylistBox';
import '../assets/PlayListsOverviewPage.scss';
import { createNewPlaylist, requestRemovePlaylist } from '../actions/playlistActions';
import { Link } from 'react-router';

class PlayListsOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
    };
    this.onPlaylistNameChange = this.onPlaylistNameChange.bind(this);
    this.onPlaylistCreateSubmit = this.onPlaylistCreateSubmit.bind(this);
    this.onPlaylistDelete = this.onPlaylistDelete.bind(this);
  };

  onPlaylistNameChange(ev) {
    this.setState({
      playlistName: ev.currentTarget.value,
    });
  };

  onPlaylistCreateSubmit(ev) {
    const {
      user
    } = this.props.credentials;

    this.props.onPlaylistCreateSubmit(user._id, this.state.playlistName);
  }

  onPlaylistDelete(id) {
    console.log('on playlist delete, id:', id);
    this.props.onPlaylistDelete(id);
  }

  render() {
    return <div className="container">
    <div className="c-add-playlist-wrapper">
      <div className="input-group c-add-playlist-box">
        <input
          type="text"
          placeholder="create a playlist"
          value={this.state.playlistName}
          onChange={ ev => this.onPlaylistNameChange(ev) }
          className="form-control"
          />
          <span className="input-group-addon">
            <button
              type="submit"
              onClick={ this.onPlaylistCreateSubmit }>
                <span className="glyphicon glyphicon-plus"></span>
            </button>
           </span>
      </div>

    </div>

<div className="c-playlist-box-container">
  <h1>My playlists</h1>

      { this.props.playlist.playlists.map((playlist, key) => {
        return <PlaylistBox
          key={key}
          id={playlist._id}
          name={playlist.name}
          onDelete={ () => this.onPlaylistDelete(playlist._id) }
        />
      })}
    </div>
    </div>
  };
};

function mapStateToProps(store) {
  return {
    playlist: store.playlist,
    credentials: store.credentials,
  };
};

const mapDispatchToProps = dispatch => ({
  onPlaylistCreateSubmit: (id, name) => dispatch(createNewPlaylist(id, name)),
  onPlaylistDelete: id => dispatch(requestRemovePlaylist(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayListsOverviewPage);
