import React from 'react';
import '../assets/Settings.scss';
import {
  saveSpotifyAccessToken
} from '../actions/credentialsActions';
import { connect } from 'react-redux';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('Settingspage mount');

    const {
      api
    } = this.props.location.query;

    switch(api) {
      case "spotify":
        console.log('Spotify');
        const {
          access_token,
          refresh_token
        } = this.props.location.query;

        this.props.saveSpotifyAccessToken(access_token);

        console.log('Store refresh_token');
        localStorage.setItem('spotifyRefreshToken', refresh_token);
        break;
    }
  }

  render() {
    console.log('Query ', this.props.location.query);
    console.log('Spotify connected', this.props.credentials.spotifyConnected);

    return <div>
      <div className="container">
        <h1 className="title">Activate and deactive our supported APIs</h1>
        <div className="row">

          <div className="col-md-12 o-settings-block">
            <p>Connect to your soundcloud account:</p>
            <img src="assets/images/soundcloud-connect.png" />
          </div>

          <div className="col-md-12 o-settings-block">
            <div className="o-settings-block__description">
              <p>Connect to your spotify account:</p>
              <a href="http://localhost:4000/spotify/login">Connect to spotify</a>
            </div>
            <div className="o-settings-block__status">
              <span style={{ color: 'green' }}>Connected</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  };
};

function mapStateToProps(store) {
  return {
    credentials: store.credentials,
  };
};

const mapDispatchToProps = dispatch => ({
  saveSpotifyAccessToken: token => dispatch(saveSpotifyAccessToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
