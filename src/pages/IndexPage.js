import React from 'react';
import ResultEntry from '../components/ResultEntry';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <div>

      <div className="container">
        <h1>Search results</h1>

        <div className="row">
          <ResultEntry origin="youtube" />
          <ResultEntry origin="soundcloud" />
        </div>

      </div>

    </div>
  };
};
