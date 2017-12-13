import React from 'react';
import HeaderBar from '../components/HeaderBar';
import '../assets/index.scss';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  };

  logout() {
    console.log('logout');
  };

  render() {

    const content = [{
      title: 'Jannik Lorenz',
      childs: [{
        type: 'link',
        title: 'Account',
        to: '/settings',
      }, {
        type: 'action',
        title: 'Logout',
        onClick: this.logout,
      }],
    }];

    return <div>
      <HeaderBar
        onLogoTo='/'
        content={content}
      />

      <div className="main">
        {this.props.children}
      </div>

      <div className="footer">
        Footer
      </div>
    </div>
  };
};
