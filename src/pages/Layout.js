import React from 'react';
import HeaderBar from '../components/HeaderBar';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <div>
      <HeaderBar />
      {this.props.children}
      <div className="footer">
        Footer
      </div>
    </div>
  };
};
