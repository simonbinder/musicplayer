import React from 'react';
import { connect } from 'react-redux';
import { selectPlaylist } from '../selector/playlistSelector';
import TrackBox from '../components/TrackBox';
import {
  startNewSong,
  removeTrackFromPlaylist,
  changeShuffleState
} from '../actions/playlistActions';
import '../assets/PlaylistPage.scss';
import { Link } from 'react-router';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSongPlay = this.onSongPlay.bind(this);
    this.onSongDelete = this.onSongDelete.bind(this);
    this.onPlaylistPlay = this.onPlaylistPlay.bind(this);
    this.onShuffleClicked = this.onShuffleClicked.bind(this);
  };

  onSongPlay(track, playlist) {
    this.props.onSongPlay(track, playlist);
  };

  onSongDelete(playlistId, track) {
    console.log('on delete');
    this.props.onSongDelete(playlistId, track);
  };

  onPlaylistPlay() {
    console.log('on playlist play');
    this.props.onSongPlay(this.props.playlist.tracks[0], this.props.playlist.tracks);
  };

  onShuffleClicked() {
    console.log('on shuffle clicked');
    this.props.onShuffleClicked();
  };

  render() {

    if(!this.props.playlist) {
      return <div className="container">
        <h2>Playlist does not exist</h2>
      </div>
    }

    return <div className="container">

      <div className="c-playlist-page__head">
          <div className="c-playlist-page__title">
            <h2>{this.props.playlist.name}</h2>
          </div>
          <div className="c-playlist-page__buttoncontainer">
            <div
              className="c-playlist-button c-playlist-button-play"
              onClick={ () => this.onPlaylistPlay() }>
            </div>
            <div
              className="c-playlist-button c-playlist-button-shuffle"
              onClick={ () => this.onShuffleClicked() }
            ></div>
          </div>
        <div className="c-playlist-page__coverbox">
        <div className="c-playlist-page__logo"></div>
        </div>
      </div>
      <div className="c-playlist-page__goback">
        <Link to={ '/playlists'}>
            <span className="glyphicon glyphicon-menu-left"></span>go back
        </Link>
      </div>

      <div className="row c-playlist-page__content">
        { this.props.playlist.tracks.map((track, key) => {
          return <TrackBox
            deactivated={track.source == null}
            title={track.title}
            artists={track.artists}
            key={key}
            onPlay={ () => this.onSongPlay(track, this.props.playlist.tracks) }
            onDelete={ () => this.onSongDelete(this.props.playlist._id, track) }
          />
        })}
      </div>
    </div>
  };
};

function mapStateToProps(store, ownProps) {
  return {
    playlist: selectPlaylist(store.playlist.playlists, ownProps.location.query.id),
  };
};

const mapDispatchToProps = dispatch => ({
  onSongPlay: (track, playlist) => dispatch(startNewSong(track, playlist)),
  onSongDelete: (playlistId, track) => dispatch(removeTrackFromPlaylist(playlistId, track)),
  onShuffleClicked: () => dispatch(changeShuffleState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
