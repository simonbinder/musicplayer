import React from 'react';
import './RegisterForm.scss';

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

  checkValid(key) {
    if (key == 'username') {
      if (this.state[key] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state[key])) {
        document.getElementById('errors-username').innerHTML = "Please enter a correct address";
        return false;
      } else if (this.state[key].length > 0) {
        document.getElementById('errors-username').innerHTML = "";
        return true;
      }
    }
    if (key == 'confirmPassword') {
      if (this.state[key] == this.state.password && this.state[key].length > 0) {
        document.getElementById('errors-confirm-password').innerHTML = "";
        return true;
      } else if (this.state[key].length > 0) {
        document.getElementById('errors-confirm-password').innerHTML = "Passwords don't match";
        return false;
      }
    }
    if (key == 'password') {
      // Password must be between 4 and 8 digits long and include at least one numeric digit.
      if (this.state[key] && /^(?=.*\d).{4,8}/.test(this.state[key])) {
        document.getElementById('errors-password').innerHTML = "";
        return true;
      } else if (this.state[key].length > 0) {
        document.getElementById('errors-password').innerHTML = "Password must be between 4 and 8 digits long and include at least one numeric digit.";
        return false;
      }
    }
  }

  handleChange(key) {
    this.checkValid(key);
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username + ' an address: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (<form onSubmit={this.checkValid}>
      <div className="form-group">
      <label>
        Username:
        <input type="email" className="form-control" placeholder="Bitte den Usernamen eingeben" value={this.state.username} onChange={this.handleChange('username')}></input>
        <div className="o-error" id="errors-username"></div>
      </label>
    </div>
    <div className="form-group">
      <label>
        Passwort:
        <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange('password')}/>
        <div className="o-error" id="errors-password"></div>
      </label>
    </div>
    <div className="form-group">
      <label>
        Passwort wiederholen:
        <input type="password" className="form-control" value={this.state.confirmPassword} onChange={this.handleChange('confirmPassword')}/>
        <div className="o-error" id="errors-confirm-password"></div>
      </label>
      <br/>
      <input type="submit" className="btn btn-primary" value="Submit"/>
      </div>
    </form>)
  };
};
