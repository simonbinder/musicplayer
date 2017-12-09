import React from 'react';
import HeaderBar from '../components/HeaderBar';
import '../assets/Main.scss';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  };

  onAccountClicked(ev) {
    
  }

  render() {
    return <div>
      <HeaderBar />

      <div className="main">
        {this.props.children}
      </div>

      <div className="footer">
        Footer
      </div>
    </div>
  };
};
