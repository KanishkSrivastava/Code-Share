import React from 'react';

import Grid from '@material-ui/core/Grid';

import FolderTree from './FolderTree';
class LandingPage extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={3}>
          <FolderTree />
        </Grid>
      </Grid>
    );
  }
}
export default LandingPage;
