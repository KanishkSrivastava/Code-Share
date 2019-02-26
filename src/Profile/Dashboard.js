import React from 'react';

import Grid from '@material-ui/core/Grid';

import FolderTree from './FolderTree';
//  DUMMY DATA for File Path
const filePath = [
  'one.js',
  'onefolder/one.js',
  'onefolder/onefolder/two.js',
  'twofolder/two.js',
  'twofolder/three.js',
  'twofolder/twofolder/one.js'
];
class LandingPage extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Grid container>
          <Grid item xs={3}>
            <FolderTree filePath={filePath} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default LandingPage;
