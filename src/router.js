import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import IndexPage from "./pages/IndexPage";
import LoginForm from "./pages/LoginForm";
import RegisterPage from "./pages/RegisterPage";

const onAuth = (nextState, replace) => {
  replace({
    pathname: '/login',
  });
};

const RootRouter = () => {
  return <Router history={browserHistory}>
    <Route path="/" onEnter={ onAuth } component={IndexPage} />
    <Route path="/login" component={LoginForm} />
    <Route path="/register" component={RegisterPage} />
  </Router>
};

export default RootRouter;
