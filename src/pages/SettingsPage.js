import React from 'react';
import '../assets/Settings.scss';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <div>
      <div className="container">
        <h1 className="title">Activate and deactive our supported APIs</h1>
        <div className="row">

          <div className="col-md-12 o-settings-block">
            <p>Connect to your soundcloud account:</p>
            <img src="assets/images/soundcloud-connect.png" />
          </div>

          <div className="col-md-12 o-settings-block">
            <p>Connect to your spotify account:</p>
            <a href="http://localhost:4000/spotify/login">Connect to spotify</a>
          </div>

        </div>
      </div>
    </div>
  };
};
