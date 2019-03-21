import React, { Component } from 'react';
import { connect } from 'react-redux';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import Switch from '@material-ui/core/Switch';

import { fileRename } from './actions/actionRenameFile';
import { fileDelete } from './actions/actionRemoveFile';
import { changeFileStatus } from './actions/actionChangeFileStatus';
export class CodeViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { renameField: 'none', newName: '', makePrivate: false };
  }
  componentWillReceiveProps({ fileName }) {
    this.setState({ newName: fileName });
  }
  toggleSwitch = () => {
    console.log(this.props);
    this.props.changeFileStatus(!this.props.status);
  };
  onRenameClick = () => {
    if (this.state.renameField === 'none') this.setState({ renameField: 'block' });
    if (this.state.renameField === 'block') this.setState({ renameField: 'none' });
  };
  onDoneClick = async () => {
    await this.props.fileRename(this.state.newName);
    this.setState({ renameField: 'none', newName: '' });
  };
  onClearClick = () => this.setState({ renameField: 'none', newName: '' });
  onDeleteClick = () => this.props.fileDelete();

  render() {
    const height = window.innerHeight - 200;
    const { fileName, content, ext, status } = this.props;
    if (content.length === 0) return <div>No Selected Files</div>;
    else
      return (
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction='row' justify='space-between' alignItems='flex-end'>
              <Grid item xs={12} md={7}>
                <Typography variant='title' gutterBottom>
                  {fileName}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  <Switch checked={status} onChange={this.toggleSwitch} color='primary' /> Private
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} style={{ paddingRight: 10, display: `${this.state.renameField}` }}>
                <Grid container alignItems='flex-end' data-test='new-file-input'>
                  <TextField
                    label='File Name'
                    value={this.state.newName}
                    onChange={newName => this.setState({ newName: newName.target.value })}
                  />
                  <div style={{ cursor: 'pointer' }}>
                    <Done onClick={this.onDoneClick} />
                    <Clear onClick={this.onClearClick} color='error' />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={8} md={2}>
                <Button variant='outlined' color='primary' size='small' onClick={this.onRenameClick}>
                  Rename
                </Button>
                <Button variant='text' color='secondary' size='small' style={{ paddingLeft: 10 }} onClick={this.onDeleteClick}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ height, overflowY: 'scroll' }}>
              <SyntaxHighlighter language={ext} style={githubGist}>
                {content}
              </SyntaxHighlighter>
            </div>
          </Grid>
        </Grid>
      );
  }
}

export default connect(
  null,
  { fileRename, fileDelete, changeFileStatus }
)(CodeViewer);
