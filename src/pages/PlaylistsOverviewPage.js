import React from 'react';
import { connect } from 'react-redux';
import PlaylistBox from '../components/PlaylistBox';
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
      <h2>Create a new playlist:</h2>
      <input type="text" value={this.state.playlistName} onChange={ ev => this.onPlaylistNameChange(ev) } />
      <button onClick={ this.onPlaylistCreateSubmit }>Create</button>

      <h2>Your playlists</h2>

      { this.props.playlist.playlists.map((playlist, key) => {
        return <PlaylistBox
          key={key}
          id={playlist._id}
          name={playlist.name}
          onDelete={ () => this.onPlaylistDelete(playlist._id) }
        />
      })}
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
