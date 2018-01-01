import React from 'react';
import {
  connect
} from 'react-redux';
import ResultEntry from '../components/ResultEntry';
import { requestSaveTrack, pauseCurrentSong } from '../actions/playlistActions';


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.onTrackAdd = this.onTrackAdd.bind(this);
  };

  onTrackAdd(playlistId, title, artists, origin, source) {
    //console.log(playlistId, title, artists, origin, source);
    this.props.onTrackSave(playlistId, title, artists, origin, source);
  };

  render() {

    const { tracks } = this.props.search;

    return <div>

      <div className="container" >
        <p>
          Lorem ipsum dolor sit amet, in qui dico eros. In est error eloquentiam necessitatibus, sed dicant aperiri ex, eu duo postea equidem. Usu no eius movet omnium. Feugiat qualisque te ius. Vis justo urbanitas vulputate at.
          Eu est lorem facilisis rationibus, pro libris constituam te. Omnes exerci fabulas sea cu, an vis dicit assentior referrentur. Nam at constituto efficiantur, te nam tamquam volumus dignissim. Unum virtute temporibus et ius, mei et summo fabulas, est tation ceteros cotidieque no. Ea nibh primis argumentum sed.
        </p>

        { tracks.length > 0 ?
          <div className="row">

            <h2>Search results:</h2>
            { this.props.search.tracks.map((track, key) => {
              return <ResultEntry
                key={key}
                title={track.name}
                artists={track.artists}
                imageUrl={track.image}
                origin={track.origin}
                playlists={this.props.playlists}
                onTrackAdd={this.onTrackAdd}
                source={track.source}
              />
            }) }
          </div>
          : null
        }

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
});

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
