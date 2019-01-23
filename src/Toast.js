import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends Component {
  componentWillReceiveProps({ loginErr }) {
    if (loginErr != null)
      toast.error(loginErr, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
  }
  render() {
    return <ToastContainer autoClose={2500} transition={Flip} />;
  }
}
const mapStateToProps = ({ login }) => {
  return {
    loginErr: login.err
  };
};
export default connect(mapStateToProps)(Toast);
