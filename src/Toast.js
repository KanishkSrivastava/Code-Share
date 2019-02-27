import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends Component {
  componentWillReceiveProps({ loginErr, userErr }) {
    if (loginErr != null)
      toast.error(loginErr, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    if (userErr != null)
      toast.error(userErr, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
  }
  render() {
    return <ToastContainer autoClose={2500} transition={Flip} />;
  }
}
const mapStateToProps = ({ login, user }) => {
  return {
    loginErr: login.err,
    userErr: user.error
  };
};
export default connect(mapStateToProps)(Toast);
