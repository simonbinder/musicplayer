import React from 'react';
import './RegisterForm.scss';
import InputFieldError from '../components/InputFieldError';
import InputField from '../components/InputField';
import { registerRequest } from '../services/accountService';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
    };
  };

  // checkValid(key) {
  //   if (key == 'username') {
  //     if (this.state[key] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state[key])) {
  //       document.getElementById('errors-username').innerHTML = "Please enter a correct address";
  //       return false;
  //     } else if (this.state[key].length > 0) {
  //       document.getElementById('errors-username').innerHTML = "";
  //       return true;
  //     }
  //   }
  //   if (key == 'confirmPassword') {
  //     if (this.state[key] == this.state.password && this.state[key].length > 0) {
  //       document.getElementById('errors-confirm-password').innerHTML = "";
  //       return true;
  //     } else if (this.state[key].length > 0) {
  //       document.getElementById('errors-confirm-password').innerHTML = "Passwords don't match";
  //       return false;
  //     }
  //   }
  //   if (key == 'password') {
  //     // Password must be between 4 and 8 digits long and include at least one numeric digit.
  //     if (this.state[key] && /^(?=.*\d).{4,8}/.test(this.state[key])) {
  //       document.getElementById('errors-password').innerHTML = "";
  //       return true;
  //     } else if (this.state[key].length > 0) {
  //       document.getElementById('errors-password').innerHTML = "Password must be between 4 and 8 digits long and include at least one numeric digit.";
  //       return false;
  //     }
  //   }
  // };

  checkValid(key) {
    switch(key) {
      case 'email': {
        if(this.state[key] != null && this.state[key] != '') {
          return '';
        } else {
          return 'Email is not valid';
        }
        break;
      }
    }
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.username + ' an address: ' + this.state.password);
  //   event.preventDefault();
  // };

  handleChange(ev, key) {
    var errorKey = key + 'Error';
    var error = this.checkValid(key);

    this.setState({
      [key]: ev.currentTarget.value,
      [errorKey]: error,
    });
  };

  handleSubmit(ev) {

    const {
      email,
      password
    } = this.state;

    if((email != null || email != '') && (password != null || password != null)) {
      registerRequest(email, password)
      .then(success => {
        console.log('Success', success);
      })
      .catch(error => {
        console.log('Error', error);
      })
    } else {
      console.log('Form not valid');
    }
  };

  render() {
    return <div>
      <div className="form-group">
        <label>
          Username:
        </label>
        <InputField
          type="email"
          placeHolder="Bitte den Usernamen eingeben"
          value={this.state.email}
          handleChange={ ev => this.handleChange(ev, 'email') }
        />
        <InputFieldError
          error={this.state.emailError}
        />
    </div>
    <div className="form-group">
      <label>
        Passwort:
      </label>
      <InputField
        type="password"
        placeHolder="Bitte das Passwort eingeben"
        value={this.state.password}
        handleChange={ ev => this.handleChange(ev, 'password') }
        />
      <InputFieldError
        error={this.state.passwordError}
      />
    </div>
    <div className="form-group">
      <label>
        Passwort wiederholen:
      </label>
      <InputField
      type="password"
      placeHolder="Bitte das Passwort bestätigen"
      value={this.state.confirmPassword}
      handleChange={ ev => this.handleChange(ev, 'confirmPassword') }
      />
      <InputFieldError
        error={this.state.confirmPasswordError}
      />
    </div>
    <div className="form-group">
      <input
        type="submit"
        className="btn btn-primary"
        onClick={ this.handleSubmit }
        value="Submit" />
      </div>
    </div>
  };
};
