import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  checkPasswordsMatch(value) {
    var match = this.refs.password.getValue() === value;
    this.setState({valid: match, password: value});
    return match;
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username + ' an address: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
      <label>
        Username:
        <input type="text" placeholder="Bitte den Usernamen eingeben" value={this.state.username} onChange={this.handleChange('username')}/>
      </label>
      <br/>
      <label>
        Passwort:
        <input type="password" value={this.state.password} onChange={this.handleChange('password')}/>
      </label>
      <br/>
      <label>
        Passwort wiederholen:
        <input type="password" value={this.state.confirmPassword} errorMessage="Passwords do not match" validate={this.checkPasswordsMatch} onChange={this.handleChange('confirmPassword')}/>
      </label>
      <br/>
      <input type="submit" value="Submit"/>
    </form>)
  };
};
