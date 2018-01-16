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

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.onTrackAdd = this.onTrackAdd.bind(this);
    this.onSongPlay = this.onSongPlay.bind(this);
  };

  onTrackAdd(playlistId, title, artists, origin, source) {
    this.props.onTrackSave(playlistId, title, artists, origin, source);
  };

  onSongPlay(track) {
    this.props.onSongPlay(track);
  };

  render() {

    const {
      error,
      tracks,
      searchValue,
    } = this.props.search;

    return <div>

      <div className="container">
        <p>The following libaries are connected:</p>
        
        <Tag
          origin="spotify"
          text="Spotify connected"
        />
        {/* <p>
          Lorem ipsum dolor sit amet, in qui dico eros. In est error eloquentiam necessitatibus, sed dicant aperiri ex, eu duo postea equidem. Usu no eius movet omnium. Feugiat qualisque te ius. Vis justo urbanitas vulputate at.
          Eu est lorem facilisis rationibus, pro libris constituam te. Omnes exerci fabulas sea cu, an vis dicit assentior referrentur. Nam at constituto efficiantur, te nam tamquam volumus dignissim. Unum virtute temporibus et ius, mei et summo fabulas, est tation ceteros cotidieque no. Ea nibh primis argumentum sed.
        </p> */}

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
                    onPlay={ () => this.onSongPlay(track) }
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
  onSongPlay: track => dispatch(startNewSong(track)),
});

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
