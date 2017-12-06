import React from 'react';
import '../assets/RegisterForm.scss';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  checkValid(key, checkValue) {
    switch(key) {
      case 'email': {
        if(checkValue && checkValue != '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(checkValue)) {
          return 'Email is not valid';
        } else {
          return '';
        }
        break;
      }
      case 'password': {
        if(checkValue && /^(?=.*\d).{4,8}/.test(checkValue)) {
          return '';
        } else {
          return 'Password must be between 4 and 8 digits long and include at least one numeric digit.';
        }
        break;
      }
      case 'confirmPassword': {
        if(checkValue == this.state.password && checkValue.length > 0) {
          return '';
        } else {
          return "Passwords don't match";
        }
        break;
      }
    }
  }

  handleChange(ev, key) {
    var errorKey = key + 'Error';
    this.setState({
      [key]: ev.currentTarget.value,
    });
    var error = this.checkValid(key, ev.currentTarget.value);

    this.setState({
      [errorKey]: error,
    })
  };

  handleSubmit(ev) {
    const {
      email,
      password
    } = this.state;

    if((email != null || email != '') && (password != null || password != null)) {
      registerRequest(email, password)
      .then(response => {
        console.log('Response', response);
        //store token
        sessionStorage.setItem('token', response.token);
        //push to indexpage
        this.props.router.push('/');
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
