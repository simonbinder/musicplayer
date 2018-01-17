import React from 'react';
import InputField from '../components/InputField';
import InputFieldError from '../components/InputFieldError';
import { loginRequest } from '../services/accountService';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { savePlaylistsInitial } from '../actions/playlistActions';
import '../assets/LoginForm.scss';

export class LoginForm extends React.Component {
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
        localStorage.setItem('token', response.token);
        //
        this.props.savePlaylistsInitial(response.playlists);
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
    return <div className="container">
    <div className="col align-self-center">
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
            className="btn btn-primary o-btn-sbt"
            onClick={ this.handleSubmit }
            value="Einloggen" />
          </div>

          <div>
            <Link className="btn btn-primary o-btn-sbt" to="/register">Don't have an account? Register here</Link>
          </div>
    </div>
    </div>
  };
};

function mapStateToProps(state) {
  return {};
};

const mapDispatchToProps = dispatch => ({
  goToIndexPage: () => dispatch(push('/')),
  savePlaylistsInitial: playlists => dispatch(savePlaylistsInitial(playlists)),
});

//TODO: rename export
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
