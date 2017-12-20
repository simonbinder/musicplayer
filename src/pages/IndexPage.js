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
    console.log(this.props.search);

    return <div>

      <div className="container">
        <h1>Search results</h1>

        <div className="row">
          <ResultEntry
            origin="spotify"
            title="New Rules"
            artists="Dua Lipa"
          />
          <ResultEntry
            origin="spotify"
          />
          <ResultEntry
            origin="spotify"
          />
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
