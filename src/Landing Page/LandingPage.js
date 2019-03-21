import React from 'react';
import { connect } from 'react-redux';

import { autolLoginAction } from '../Navbar/action';

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.autolLoginAction();
  }
  render() {
    return <div style={{ marginTop: 100 }}>hello</div>;
  }
}
export default connect(
  null,
  { autolLoginAction }
)(LandingPage);
