import React from 'react';
import {
  connect
} from 'react-redux';
import ResultEntry from '../components/ResultEntry';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {

    return <div>

      <div className="container">
        <h1>Search results</h1>

        <div className="row">
          { this.props.search.tracks.map((track, key) => {
            console.log(track);
            return <ResultEntry
              key={key}
              title={track.name}
              artists={track.artists}
              imageUrl={track.image}
            />
          }) }
        </div>

      </div>

    </div>
  };
};

function mapStateToProps(store, ownProps) {
  return {
    search: store.search,
  };
};

const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
