import React from 'react';
import { connect } from 'react-redux';
import { selectPlaylist } from '../selector/playlistSelector';
import TrackBox from '../components/TrackBox';
import { startNewSong } from '../actions/playlistActions';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSongPlay = this.onSongPlay.bind(this);
  };

  onSongPlay(track) {
    this.props.onSongPlay(track);
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
      <div className="row">
        { this.props.playlist.tracks.map((track, key) => {
          return <TrackBox
            title={track.title}
            artists={track.artists}
            key={key}
            onPlay={ () => this.onSongPlay(track) }
          />
        })}
      </div>
    </div>
  };
};

function mapStateToProps(store, ownProps) {
  return {
    //playlist: store.playlist,
    playlist: selectPlaylist(store.playlist.playlists, ownProps.location.query.id),
    //ownProps: ownProps,
  };
};

const mapDispatchToProps = dispatch => ({
  onSongPlay: track => dispatch(startNewSong(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
