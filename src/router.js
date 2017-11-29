import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import App from "./app";
import RegisterForm from "./registerForm";

const RootRouter = () => {
  return <Router history={browserHistory}>
    <Route path="/">
      <Route component={App} />
      <Route path="register" component={RegisterForm} />
    </Route>
  </Router>
};

export default RootRouter;
