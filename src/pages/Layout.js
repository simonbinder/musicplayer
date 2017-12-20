import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import '../assets/index.scss';
import { connect } from 'react-redux';
import { searchValueChanged } from '../actions/searchActions';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnChange = this.searchOnChange.bind(this);
  };

  logout() {
    console.log('logout');
  };

  searchOnChange(ev) {
    // fetch('http://localhost:4000/spotify/search', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     access_token: 'BQDcu5VLu3DEEKUDsD3UWbhCSl9K5x5f1DKGNsEP9bG5ca8TZdOOZb015v_SYa3o6-qIAMbdNYo-hqYzmZEgcULBBYh0DXrzZ3WLvwilCrEEiPWLS-XzepC5C5_NsAKrNAPtt_b-1gyhtvdKozwnxniMAuCKChejiA',
    //     q: 'Christmas',
    //   }),
    // }).then(response => response.json())
    // .then(response => {
    //   console.log('Spotify response', response);
    // })
    // .catch(error => {
    //   console.log('Spotify search error', error);
    // });
    this.props.onSearchValueChanged(ev.currentTarget.value);
  }

  render() {

    const {
      searchValue,
    } = this.props.search;

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
        searchValue={searchValue}
      />
      <div className="main">
        {this.props.children}
      </div>
      <FooterBar />
    </div>
  };
};

function mapStateToProps(store) {
  return {
    search: store.search,
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchValueChanged: value => dispatch(searchValueChanged(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
