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

  searchOnChange(ev) {
    fetch('http://localhost:4000/spotify/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: 'BQDPY6Jv0Kolz_N9vo84Id7vmneTb1QBl6e6hci-SYQK8FSQSRF4-jG28GO4QfeXTUBksFRXOJyh2jEAJ96-uD_F_F1nJHy11GEa8copIqyQA0fw_aEfUNLlvAb-i2fVjLP08c_ko6eMoJMiM_6w7z3WYKezrxnTmQ',
        q: 'New Rules',
      }),
    }).then(response => response.json())
    .then(response => {
      console.log('Spotify response', response);
    })
    .catch(error => {
      console.log('Spotify search error', error);
    });
  }

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
        searchOnChange={this.searchOnChange}
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
