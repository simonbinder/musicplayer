import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import IndexPage from "./pages/IndexPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import RegisterPage from "./pages/RegisterPage";
import Layout from './pages/Layout';
import SettingsPage from './pages/SettingsPage';
import {
  verifyToken
} from './services/accountService';
import SpotifyPage from './pages/SpotifyPage';
import {
  Provider
} from 'react-redux';
import {
  createStore
} from 'redux';


const onAuth = (nextState, replace, callback) => {
  callback();

  // var token = sessionStorage.getItem('token');
  // console.log('Token', token);
  //
  // if(token == null) {
  //   console.log('Token is null');
  //   replace({
  //     pathname: '/login',
  //   });
  //   return;
  // }
  //
  // console.log('Token is there');
  // verifyToken(token)
  //   .then(response => {
  //     console.log('Token verify response', response);
  //     //set token
  //     sessionStorage.setItem('token', response.token);
  //     //set user (WIP)
  //     sessionStorage.setItem('user', JSON.parse(response.user));
  //     callback();
  //   })
  //   .catch(err => {
  //     replace({
  //       pathname: '/login',
  //     });
  //     return;
  //   });
};

const RootRouter = () => {
  return <Provider>
    <Router history={browserHistory}>
      <Route component={Layout}>
        <Route path="/" onEnter={ onAuth } component={IndexPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/settings" onEnter={ onAuth } component={SettingsPage} />
        <Route path="/spotify" component={SpotifyPage} />
      </Route>
    </Router>
  </Provider>
};

export default RootRouter;
