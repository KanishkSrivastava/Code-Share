import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store';
import Navbar from './Navbar/Navbar';
import Toast from './Toast';
import Dashboard from './Profile/Dashboard';
import LandingPage from './Landing Page/LandingPage';

const AppRouter = ({ status }) => (
  <ConnectedRouter history={history}>
    <div>
      <Navbar logedIn={status} />
      <Toast />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <PrivateRoute path='/home' status={status} Component={Dashboard} />
        <Route path='*' component={() => <h1 style={{ color: 'red', marginTop: 100 }}>404 Not Found</h1>} />
      </Switch>
    </div>
  </ConnectedRouter>
);
const mapStateToProps = ({ login }) => {
  return {
    status: login.status
  };
};
export default connect(mapStateToProps)(AppRouter);
const PrivateRoute = ({ Component, status, path }) => {
  return (
    <Route
      path={path}
      render={props => (status ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
  );
};
