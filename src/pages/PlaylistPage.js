import React from 'react';
import { connect } from 'react-redux';
import { selectPlaylist } from '../selector/playlistSelector';
import TrackBox from '../components/TrackBox';
import { startNewSong, removeTrackFromPlaylist } from '../actions/playlistActions';
import '../assets/PlaylistPage.scss';
import { Link } from 'react-router';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSongPlay = this.onSongPlay.bind(this);
    this.onSongDelete = this.onSongDelete.bind(this);
  };

  onSongPlay(track) {
    this.props.onSongPlay(track);
  };

  onSongDelete(playlistId, track) {
    console.log('on delete');
    this.props.onSongDelete(playlistId, track);
  };

  render() {

    console.log('Playlist', this.props.playlist);
    console.log('ownProps', this.props.ownProps);

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
            <div className="c-playlist-button c-playlist-button-play"></div>
            <div className="c-playlist-button c-playlist-button-shuffle"></div>
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
            title={track.title}
            artists={track.artists}
            key={key}
            onPlay={ () => this.onSongPlay(track) }
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
  onSongPlay: track => dispatch(startNewSong(track)),
  onSongDelete: (playlistId, track) => dispatch(removeTrackFromPlaylist(playlistId, track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
