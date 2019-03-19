import axios from 'axios';
import * as types from '../../types';

import { userErrorShown, userError } from '../../utils/actionUtils';
import { getFilePath } from './actionGetFilesPath';
import { getKeyByValue } from '../..//utils/generalFunctions';
import FILE_EXTENSIONS from '../../FileExtensions';

const fileRenaming = () => {
  return { type: types.USER_FILE_RENAMING };
};
const fileRenamed = () => {
  return { type: types.USER_FILE_RENAMED };
};

export const fileRename = newFileName => async (dispatch, getState) => {
  dispatch(fileRenaming());
  if (getState().user.error) await dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const fileIdsAndPath = getState().user.allFiles;
  const { selectedFilePath } = getState().user;
  const { selectedFileName } = getState().user;
  const newName = `${selectedFilePath.replace(selectedFileName, '')}${newFileName}`;
  const fileId = getKeyByValue(fileIdsAndPath, selectedFilePath);
  const options = { headers: { Authorization } };
  const payload = { id, newName, fileId };
  try {
    const extensionOfFile = `${newFileName.substring(newFileName.lastIndexOf('.') + 1, newFileName.length)}`;
    if (newFileName === '') throw new Error(`Filename cannot be empty`);
    if (newFileName === extensionOfFile) throw new Error(`Add extension of file in the name`);
    if (FILE_EXTENSIONS.indexOf(extensionOfFile) === -1) throw new Error(`File extension not supported`);
    const { data } = await axios.post(`${URL}/user/rename-file`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else {
      await dispatch(getFilePath());
      dispatch({ type: types.USER_CHANGE_SELECTED_FILE_NAME, payload: { selectedFileName: newFileName } });
    }
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(fileRenamed());
};
