import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import '../assets/index.scss';
import { connect } from 'react-redux';
import { searchValueChanged } from '../actions/searchActions';
import { resetCredentials } from '../actions/credentialsActions';
import { push } from 'react-router-redux';
import { isEmpty } from '../utils';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.logout = this.logout.bind(this);
  };

  logout() {
    console.log('logout');
    this.props.resetCredentials();
    //
    localStorage.removeItem('token');
    //
    this.props.goToLoginPage();
  };

  searchOnChange(ev) {
    this.props.onSearchValueChanged(ev.currentTarget.value);
  }

  render() {

    const { searchValue } = this.props.search;
    const { user } = this.props.credentials;
    const { activeTrack } = this.props.playlist;
    let content = [];

    if(user) {
      content = [{
        title: user.email,
        childs: [{
          type: 'link',
          title: 'Account',
          to: '/settings',
        }, {
          type: 'link',
          title: 'My playlists',
          to: '/playlists',
        }, {
          type: 'action',
          title: 'Logout',
          onClick: this.logout,
        }],
      }];
    }

    let searchBarActive = user != null;

    return <div>
      <HeaderBar
        onLogoTo='/'
        content={content}
        searchOnChange={this.searchOnChange}
        searchValue={searchValue}
        searchBarActive={searchBarActive}
      />

      <div className="main">
        {this.props.children}
      </div>

      <FooterBar
        activeTrack={activeTrack}
      />
    </div>
  };
};

function mapStateToProps(store) {
  return {
    search: store.search,
    credentials: store.credentials,
    playlist: store.playlist,
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchValueChanged: value => dispatch(searchValueChanged(value)),
  resetCredentials: () => dispatch(resetCredentials()),
  goToLoginPage: () => dispatch(push('/login')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
