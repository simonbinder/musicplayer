import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import IndexPage from "./pages/IndexPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import RegisterPage from "./pages/RegisterPage";
import Layout from './pages/Layout';
import SettingsPage from './pages/SettingsPage';
import PlayListsOverviewPage from './pages/PlayListsOverviewPage';
import { verifyToken } from './services/accountService';
import store from './store';
import { push } from 'react-router-redux';
import { saveUser } from './actions/credentialsActions';
import { savePlaylistsInitial } from './actions/playlistActions';
import PlaylistPage from './pages/Playlistpage';

const onAuth = (nextState, replace, callback) => {
  setTimeout(() => {
    //store.dispatch(push('/login'));
    let token = localStorage.getItem('token');

    if(token == null) {
      console.log('Token is null or not exists');
      store.dispatch(push('/login'));
      return;
    }

    console.log('Token is there');
    verifyToken(token)
      .then(response => {
        console.log('Token verfify response', response);
        //
        localStorage.setItem('token', response.token);
        //
        store.dispatch(saveUser(response.user));
        //
        store.dispatch(savePlaylistsInitial(response.playlists));

        localStorage.setItem('userId', response.user._id);
        //
        callback();
      })
      .catch(err => {
        console.log('Error verifying the token', err);

        localStorage.removeItem('userId');

        store.dispatch(push('/login'));
        return;
      })
  }, 500);
};

const RootRouter = () => {
  return <Router history={browserHistory}>
      <Route component={Layout}>
        <Route path="/" onEnter={ onAuth } component={IndexPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/settings" onEnter={ onAuth } component={SettingsPage} />
        <Route path="/playlists" onEnter={ onAuth } component={PlayListsOverviewPage} />
        <Route path="/playlist" onEnter={ onAuth } component={PlaylistPage} />
      </Route>
    </Router>
};

export default RootRouter;
