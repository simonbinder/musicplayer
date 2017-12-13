import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';


export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  };



  render() {
    return <div>
      <HeaderBar />
      {this.props.children}
      <FooterBar />
    </div>
  };
};
