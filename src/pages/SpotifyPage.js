import React, { Component } from 'react';

export default class SpotifyPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(){
    fetch('http://localhost:4000/spotify/login', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }).then(response=>{
           console.log(response.headers)
       })
  //  this.props.router.push('/spotify');
  };

  render() {
    return (
      <div>
        <h2>Here our Spotify page!</h2>
        <input
          type="submit"
          className="btn btn-primary"
          onClick={ this.handleSubmit }
          value="Submit" />
      </div>
    );
  };
};
