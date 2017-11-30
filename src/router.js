import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import IndexPage from "./pages/IndexPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

const RootRouter = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={IndexPage} />
    <Route path="/login" component={LoginForm} />
    <Route path="/register" component={RegisterForm} />
  </Router>
};

export default RootRouter;
