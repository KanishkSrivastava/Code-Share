import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Toast from './Toast';
const AppRouter = ({ status }) => (
  <Router>
    <div>
      <Navbar logedIn={status} />
      <Toast />
    </div>
  </Router>
);
const mapStateToProps = ({ login }) => {
  return {
    status: login.status
  };
};
export default connect(mapStateToProps)(AppRouter);
