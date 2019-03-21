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
import NewFile from '@material-ui/icons/InsertDriveFile';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import { fileContent } from './actions/actionGetFileContent';
import { uploadFile } from './actions/actionUploadFile';

export class FolderTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '',
      filePath: this.props.filePath,
      newFolderInput: 'none',
      newFolder: '',
      newFileInput: 'none',
      newFile: '',
      newFileContent: ''
    };
  }
  onFolderClick = folder => this.setState({ currentPath: `${this.state.currentPath}${folder}/` });
  onFileClick = file => {
    const filePath = `${this.state.currentPath}${file}`;
    this.props.fileContent(filePath, file);
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
    if (newFolderInput === 'block') this.setState({ newFolderInput: 'none', newFileInput: 'none' });
    else this.setState({ newFolderInput: 'block', newFileInput: 'none' });
  };
  onDoneClickFolder = () => {
    let { filePath, currentPath, newFolder } = this.state;
    if (newFolder.length !== 0) {
      const path = `${currentPath}${newFolder}/empty`;
      filePath.push(path);
      this.setState({ filePath, newFolder: '', newFolderInput: 'none' });
    } else this.setState({ newFolder: '', newFolderInput: 'none' });
  };
  onClearClickFolder = () => this.setState({ newFolderInput: 'none', newFolder: '' });
  onNewFileClick = () => {
    const { newFileInput } = this.state;
    if (newFileInput === 'block') this.setState({ newFileInput: 'none', newFolderInput: 'none' });
    else this.setState({ newFileInput: 'block', newFolderInput: 'none' });
  };
  handleFileChosen = file => {
    if (file !== undefined) {
      this.setState({ newFile: file.name });
      let fileReader = new FileReader();
      fileReader.onloadend = () => this.setState({ newFileContent: fileReader.result });
      fileReader.readAsText(file);
    }
  };
  onDoneClickFile = async () => {
    const { newFileContent, currentPath, newFile } = this.state;
    await this.props.uploadFile(newFileContent, `${currentPath}${newFile}`);
    this.setState({ newFileContent: '', newFileInput: 'none', newFile: '' });
  };
  onClearClickFile = () => this.setState({ newFileInput: 'none', newFile: '' });
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
        else return null;
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
            else return null;
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
    return (
      <Grid container>
        <Grid item xs={12}>
          <Fab size='small' color='primary' style={{ marginRight: 15 }} onClick={this.onBackButtonClick} data-test='back-button'>
            <BackIcon />
          </Fab>
          <Fab size='small' color='primary' style={{ marginRight: 15 }} onClick={this.onNewFolderClick} data-test='new-folder-button'>
            <NewFolder />
          </Fab>
          <Fab size='small' color='primary' onClick={this.onNewFileClick} data-test='new-folder-button'>
            <NewFile />
          </Fab>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: 10, display: this.state.newFolderInput }}>
          <Grid container alignItems='flex-end' data-test='new-folder-input'>
            <TextField
              label='New Folder'
              value={this.state.newFolder}
              onChange={newFolder => this.setState({ newFolder: newFolder.target.value })}
            />
            <div style={{ cursor: 'pointer' }}>
              <Done onClick={this.onDoneClickFolder} />
              <Clear color='error' onClick={this.onClearClickFolder} />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: 10, display: this.state.newFileInput }}>
          <Grid container alignItems='flex-end' data-test='new-file-input'>
            <TextField type='file' label='Select File' onChange={file => this.handleFileChosen(file.target.files[0])} />
            <TextField
              label='File Name'
              value={this.state.newFile}
              onChange={newFile => this.setState({ newFile: newFile.target.value })}
            />
            <div style={{ cursor: 'pointer' }}>
              <Done onClick={this.onDoneClickFile} />
              <Clear onClick={this.onClearClickFile} color='error' />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} data-test='folder-tree'>
          {this.makeFolder()}
        </Grid>
      </Grid>
    );
  }
}
export default connect(
  null,
  { fileContent, uploadFile }
)(FolderTree);
