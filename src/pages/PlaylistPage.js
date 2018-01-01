import React from 'react';
import { connect } from 'react-redux';
import { selectPlaylist } from '../selector/playlistSelector';
import TrackBox from '../components/TrackBox';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {

    console.log('Playlist', this.props.playlist);
    console.log('ownProps', this.props.ownProps);

    const tracks = [
      'New Rules',
      'New Rules 1',
      'New Rules 2',
    ];

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

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
