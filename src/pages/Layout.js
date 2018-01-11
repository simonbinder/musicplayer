import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import '../assets/index.scss';
import { connect } from 'react-redux';
import { searchValueChanged } from '../actions/searchActions';
import { resetCredentials } from '../actions/credentialsActions';
import { push } from 'react-router-redux';
import { isEmpty } from '../utils';
import { changeShuffleState, pauseCurrentSong } from '../actions/playlistActions';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.logout = this.logout.bind(this);
    this.onShuffleClicked = this.onShuffleClicked.bind(this);
    this.onPauseClicked = this.onPauseClicked.bind(this);
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

  onShuffleClicked(ev) {
    this.props.onShuffleStateChanged();
  };

  onPauseClicked(ev) {
    this.props.onPauseClicked(ev);
  };

  render() {

    const { searchValue } = this.props.search;
    const { user } = this.props.credentials;
    const { activeTrack, shuffle } = this.props.playlist;
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
        onShuffleClicked={this.onShuffleClicked}
        shuffleState={shuffle}
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
  onShuffleStateChanged: () => dispatch(changeShuffleState()),
  onPauseClicked: () => dispatch(pauseCurrentSong()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
