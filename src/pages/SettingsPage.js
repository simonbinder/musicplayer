import React from 'react';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <div>
      <div className="container">
        <h1 className="title">Activate and deactive our supported APIs</h1>
        <div className="row">

          <div className="col-md-12">
            <p>Connect to our soundcloud account:</p>
            <img src="assets/images/soundcloud-connect.png" />
          </div>

          
        </div>
      </div>
    </div>
  };
};
