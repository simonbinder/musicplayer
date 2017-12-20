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
        access_token: 'BQADfXwi3s05_B8auLQCqmix49q8k41PcjFlUkHndr2UfHRIZDvHf7QQNH_10T8tgRSi6hQPctI-KacyjLfEU1q3YMYeNz1zLhV3gH6RYvCVuwqu6viAfTgTDgBbF1c4ABnlC3KChHNIWn46sPLHH5BJbE-cwaSeWw',
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
