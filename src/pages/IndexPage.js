import React from 'react';
import ResultEntry from '../components/ResultEntry';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log('Store', this.props.store);

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
