import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';

import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import BackIcon from '@material-ui/icons/ArrowBack';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: '' };
  }
  onFolderClick = folder => this.setState({ currentPath: `${this.state.currentPath}${folder}/` });
  // TODO : make file Click handler
  onFileClick = file => {};
  onBackButtonClick = () => {
    let { currentPath } = this.state;
    let newPath = '';
    const currentPathArray = currentPath.split('/');
    for (let i = 1; i < currentPathArray.length; i++) newPath = `${newPath}/${currentPathArray[i]}`;
    newPath = newPath.substring(1);
    this.setState({ currentPath: newPath });
  };
  makeFolder() {
    // TODO: Get Data from Redux Store
    const filePath = [
      'one.js',
      'onefolder/one.js',
      'onefolder/onefolder/two.js',
      'twofolder/two.js',
      'twofolder/three.js',
      'twofolder/twofolder/one.js'
    ];
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
        return (
          <ListItem button key={file}>
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
            return (
              <ListItem button key={file}>
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
    return (
      <div style={{ marginTop: 100 }}>
        <Fab size='small' color='primary' aria-label='Add' onClick={this.onBackButtonClick}>
          <BackIcon />
        </Fab>
        {this.makeFolder()}
      </div>
    );
  }
}
