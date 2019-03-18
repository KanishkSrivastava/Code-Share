import axios from 'axios';
import * as types from '../../types';

import FILE_EXTENSIONS from '../../FileExtensions';
import { userErrorShown, userError, getFilePath } from './actionGetFilesPath';

const uploadingFile = () => {
  return { type: types.USER_UPLOADING_FILE };
};
const uploadedFile = () => {
  return { type: types.USER_UPLOADED_FILE };
};

export const uploadFile = (content, path) => async (dispatch, getState) => {
  dispatch(uploadingFile());
  if (getState().user.error) await dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const options = { headers: { Authorization } };
  const payload = { content, path, id };
  try {
    const extensionOfFile = `${path.substring(path.lastIndexOf('.') + 1, path.length)}`;
    if (path === '') throw new Error(`Filename cannot be empty`);
    if (path === extensionOfFile) throw new Error(`Add extension of file in the name`);
    if (FILE_EXTENSIONS.indexOf(extensionOfFile) === -1) throw new Error(`This type of file cannot be uploaded`);
    if (content !== '') {
      const { data } = await axios.post(`${URL}/user/upload-file`, payload, options);
      if (data.statusCode !== 200) throw new Error(data.error);
      else dispatch(getFilePath());
    } else throw new Error(`No content found in the file`);
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(uploadedFile());
};
