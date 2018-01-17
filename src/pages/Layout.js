import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import '../assets/index.scss';
import { connect } from 'react-redux';
import { searchValueChanged } from '../actions/searchActions';
import { resetCredentials } from '../actions/credentialsActions';
import { push } from 'react-router-redux';
import { isEmpty } from '../utils';
import {
  changeShuffleState,
  pauseCurrentSong,
  playPreviousSong,
  playNextSong,
  playCurrentSong
} from '../actions/playlistActions';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.logout = this.logout.bind(this);
    this.onShuffleClicked = this.onShuffleClicked.bind(this);
    this.onPauseClicked = this.onPauseClicked.bind(this);
    this.onPreviousClicked = this.onPreviousClicked.bind(this);
    this.onNextClicked = this.onNextClicked.bind(this);
    this.onPlayClicked = this.onPlayClicked.bind(this);
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

  onPlayClicked() {
    this.props.onPlayClicked();
  };

  onPreviousClicked() {
    this.props.onPreviousClicked();
  };

  onNextClicked() {
    this.props.onNextClicked();
  };

  render() {

    const { searchValue } = this.props.search;
    const { user } = this.props.credentials;
    const {
      activeTrack,
      shuffle,
      progress,
      playStatus,
    } = this.props.playlist;

    let content = [];

    if(user) {
      content = [{
        title: user.email,
        childs: [{
          type: 'link',
          title: 'account',
          class: 'bla',
          to: '/settings',
        }, {
          type: 'link',
          title: 'my playlists',
          to: '/playlists',
        }, {
          type: 'action',
          title: 'logout',
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
        progress={progress}
        onPreviousClicked={ () => this.onPreviousClicked() }
        onNextClicked={ () => this.onNextClicked() }
        onPauseClicked={ () => this.onPauseClicked() }
        onPlayClicked={ () => this.onPlayClicked() }
        playStatus={playStatus}
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
  onPreviousClicked: () => dispatch(playPreviousSong()),
  onNextClicked: () => dispatch(playNextSong()),
  onPlayClicked: () => dispatch(playCurrentSong()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
