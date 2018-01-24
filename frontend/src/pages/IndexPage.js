import React from 'react';
import {
  connect
} from 'react-redux';
import ResultEntry from '../components/ResultEntry';
import { 
  requestSaveTrack,
  pauseCurrentSong,
  startNewSong
} from '../actions/playlistActions';
import Tag from '../components/Tag';
import { Link } from 'react-router';


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.onTrackAdd = this.onTrackAdd.bind(this);
    this.onSongPlay = this.onSongPlay.bind(this);
  };

  onTrackAdd(playlistId, title, artists, origin, source) {
    this.props.onTrackSave(playlistId, title, artists, origin, source);
  };

  onSongPlay(track, tracks) {
    this.props.onSongPlay(track, tracks);
  };

  render() {

    const {
      error,
      tracks,
      searchValue,
    } = this.props.search;

    const {
      spotifyAccessToken,
    } = this.props.credentials;

    return <div className="o-index-container">

      <div className="container">

      <div className="o-index-container-welcomebar">
        <h1>Welcome to unlimited music access!</h1>
        <h3>The following platforms are connected:</h3>
      </div>

        { spotifyAccessToken != null ?
          <Tag
            origin="spotify"
            text="Spotify connected"
          /> : <p>No music provider connected, please go to <Link to="/settings">Settings</Link></p> }

        {/* search error */}
        { error ?
          <div className="alert alert-danger">{error}</div> :
          searchValue != '' ?
            <div className="row">
              <h2>Search Results</h2>
              { tracks.length > 0 ?
                this.props.search.tracks.map((track, key) => {
                  return <ResultEntry
                    key={key}
                    title={track.title}
                    artists={track.artists}
                    imageUrl={track.image}
                    origin={track.origin}
                    playlists={this.props.playlists}
                    onTrackAdd={this.onTrackAdd}
                    source={track.source}
                    onPlay={ () => this.onSongPlay(track, this.props.search.tracks) }
                  />
                })
              : <p>No tracks found for your query</p> }
            </div>
          : null }



      </div>

    </div>
  };
};

function mapStateToProps(store, ownProps) {
  return {
    search: store.search,
    credentials: store.credentials,
    playlists: store.playlist.playlists,
  };
};

const mapDispatchToProps = dispatch => ({
  onTrackSave: (playlistId, title, artists, origin, source) => dispatch(requestSaveTrack(playlistId, title, artists, origin, source)),
  onSongPlay: (track, tracks) => dispatch(startNewSong(track, tracks)),
});

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
