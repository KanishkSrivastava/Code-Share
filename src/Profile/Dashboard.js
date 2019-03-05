import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import FolderTree from './FolderTree';
import CodeViewer from './CodeViewer';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filePath: [], content: '', ext: '' };
  }
  componentWillReceiveProps({ allFiles, file }) {
    if (this.props.allFiles !== allFiles) {
      const filePath = [];
      Object.keys(allFiles).forEach(key => {
        filePath.push(allFiles[key]);
      });
      this.setState({ filePath });
    }
    this.setState({ content: file.content, ext: file.ext });
  }
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Grid container>
          <Grid item xs={8} md={3}>
            <FolderTree filePath={this.state.filePath} />
          </Grid>
          <Grid item xs={12} md={7}>
            <CodeViewer content={this.state.content} ext={this.state.ext} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  return {
    allFiles: user.allFiles,
    file: { content: user.selectedFileContent, ext: user.ext }
  };
};
export default connect(mapStateToProps)(LandingPage);
