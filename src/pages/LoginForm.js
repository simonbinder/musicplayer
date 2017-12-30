import React from 'react';
import InputField from '../components/InputField';
import InputFieldError from '../components/InputFieldError';
import { loginRequest } from '../services/accountService';
import { Link } from 'react-router';

export default class LoginForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    };

    checkValid(key, checkValue) {
      switch(key) {
        case 'email': {
          if(checkValue) {
            return '';
          }else {
            return 'Please enter a valid Username';
          }
          break;
        }
        case 'password':
          if(checkValue){
            return '';
          }else{
            return 'Please enter your password';
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
        [errorKey]:error,
      })
    };

  handleSubmit(ev) {

    const {
      email,
      password
    } = this.state;

    var valid = (email != '' || email != null)
      && (password != '' || password != null);

    if(valid) {
      loginRequest(email, password)
      .then(response => {
        console.log('Login response', response);
        //save token
        sessionStorage.setItem('token', response.token);
        //go to indexpage
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
          Password:
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
          <input
            type="submit"
            className="btn btn-primary"
            onClick={ this.handleSubmit }
            value="Submit" />
          </div>

          <div>
            <Link to="/register">Don't have an account. Register here</Link>
          </div>
    </div>
  };
};
