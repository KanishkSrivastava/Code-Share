import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import FolderTree from './FolderTree';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filePath: [] };
  }
  componentWillReceiveProps({ allFiles }) {
    if (this.props.allFiles !== allFiles) {
      const filePath = [];
      Object.keys(allFiles).forEach(key => {
        filePath.push(allFiles[key]);
      });
      this.setState({ filePath });
    }
  }
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Grid container>
          <Grid item xs={3}>
            <FolderTree filePath={this.state.filePath} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  return {
    allFiles: user.allFiles
  };
};
export default connect(mapStateToProps)(LandingPage);
