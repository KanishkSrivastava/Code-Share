import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import BackIcon from '@material-ui/icons/ArrowBack';
import NewFolder from '@material-ui/icons/CreateNewFolder';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import { fileContent } from './actions/actionGetFileContent';

export class FolderTree extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: '', filePath: this.props.filePath, newFolderInput: 'none', newFolder: '' };
  }
  onFolderClick = folder => this.setState({ currentPath: `${this.state.currentPath}${folder}/` });
  onFileClick = file => {
    const filePath = `${this.state.currentPath}${file}`;
    this.props.fileContent(filePath);
  };
  onBackButtonClick = () => {
    let { currentPath } = this.state;
    let newPath = '';
    const currentPathArray = currentPath.split('/');
    for (let i = 1; i < currentPathArray.length; i++) newPath = `${newPath}/${currentPathArray[i]}`;
    newPath = newPath.substring(1);
    this.setState({ currentPath: newPath });
  };
  onNewFolderClick = () => {
    const { newFolderInput } = this.state;
    if (newFolderInput === 'block') this.setState({ newFolderInput: 'none' });
    else this.setState({ newFolderInput: 'block' });
  };
  onDoneClick = () => {
    let { filePath, currentPath, newFolder } = this.state;
    if (newFolder.length !== 0) {
      const path = `${currentPath}${newFolder}/empty`;
      filePath.push(path);
      this.setState({ filePath, newFolder: '', newFolderInput: 'none' });
    } else this.setState({ newFolder: '', newFolderInput: 'none' });
  };
  onClearClick = () => this.setState({ newFolderInput: 'none', newFolder: '' });
  componentWillReceiveProps({ filePath }) {
    this.setState({ filePath });
  }
  makeFolder() {
    const { filePath } = this.state;
    let homeFolders = new Set();
    let homeFiles = [];
    filePath.forEach(element => {
      if (element.includes('/')) homeFolders.add(element.split('/')[0]);
      else homeFiles.push(element);
    });
    const returnHomeFolder = () => {
      return [...homeFolders].map(folder => {
        return (
          <ListItem button key={folder} onClick={() => this.onFolderClick(folder)}>
            <FolderIcon color='primary' />
            <ListItemText primary={folder} />
          </ListItem>
        );
      });
    };
    const returnHomeFiles = () => {
      return homeFiles.map(file => {
        if (file !== 'empty')
          return (
            <ListItem button key={file} onClick={() => this.onFileClick(file)}>
              <FileIcon color='primary' />
              <ListItemText primary={file} />
            </ListItem>
          );
      });
    };
    const returnInsideFolder = () => {
      let folderSet = new Set();
      filePath.forEach(folderAndFiles => {
        if (folderAndFiles.indexOf(this.state.currentPath) >= 0) {
          const item = folderAndFiles.replace(this.state.currentPath, '');
          if (item.includes('/')) {
            const folder = item.split('/')[0];
            folderSet.add(folder);
          }
        }
      });
      return [...folderSet].map(folder => {
        return (
          <ListItem button key={folder} onClick={() => this.onFolderClick(folder)}>
            <FolderIcon color='primary' />
            <ListItemText primary={folder} />
          </ListItem>
        );
      });
    };
    const returnInsideFiles = () => {
      return filePath.map(folderAndFiles => {
        if (folderAndFiles.indexOf(this.state.currentPath) >= 0) {
          const item = folderAndFiles.replace(this.state.currentPath, '');
          if (!item.includes('/')) {
            const file = item;
            if (file !== 'empty')
              return (
                <ListItem button key={file} onClick={() => this.onFileClick(file)}>
                  <FileIcon color='primary' />
                  <ListItemText primary={file} />
                </ListItem>
              );
          } else return null;
        } else return null;
      });
    };
    if (this.state.currentPath === '')
      return (
        <List component='nav'>
          {returnHomeFolder()}
          {returnHomeFiles()}
        </List>
      );
    else
      return (
        <List component='nav'>
          {returnInsideFolder()}
          {returnInsideFiles()}
        </List>
      );
  }
  render() {
    const { filePath } = this.props;
    if (filePath.length !== 0)
      return (
        <Grid container>
          <Grid item xs={12} data-test='navigation-button'>
            <Fab
              size='small'
              color='primary'
              aria-label='Add'
              style={{ marginRight: 15 }}
              onClick={this.onBackButtonClick}
            >
              <BackIcon />
            </Fab>
            <Fab size='small' color='primary' onClick={this.onNewFolderClick}>
              <NewFolder />
            </Fab>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: 10, display: this.state.newFolderInput }}>
            <Grid container alignItems='flex-end' data-test='new-folder-input'>
              <TextField
                id='outlined-name'
                label='New Folder'
                value={this.state.newFolder}
                onChange={newFolder => this.setState({ newFolder: newFolder.target.value })}
              />
              <div style={{ cursor: 'pointer' }}>
                <Done onClick={this.onDoneClick} />
                <Clear color='error' onClick={this.onClearClick} />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} data-test='folder-tree'>
            {this.makeFolder()}
          </Grid>
        </Grid>
      );
    else return <div data-test='no-files'>No Files</div>;
  }
}
export default connect(
  null,
  { fileContent }
)(FolderTree);
