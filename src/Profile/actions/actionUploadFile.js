import axios from 'axios';
import * as types from '../../types';

import { userErrorShown, userError, getFilePath } from './actionGetFilesPath';

const uploadingFile = () => {
  return { type: types.USER_UPLOADING_FILE };
};
const uploadedFile = () => {
  return { type: types.USER_UPLOADED_FILE };
};
export const uploadFile = (content, path) => async (dispatch, getState) => {
  dispatch(uploadingFile());
  if (getState().user.error) dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const options = { headers: { Authorization } };
  const payload = { content, path, id };
  try {
    if (path === '') throw new Error(`Filename cannot be empty [code: ${Math.floor(Math.random() * 10 + 1)}]`);
    if (path === `${path.substring(path.lastIndexOf('.') + 1, path.length)}`)
      throw new Error(`Add extension of file in the name [code: ${Math.floor(Math.random() * 10 + 1)}]`);
    if (content !== '') {
      const { data } = await axios.post(`${URL}/user/upload-file`, payload, options);
      if (data.statusCode !== 200) throw new Error(data.error);
      else dispatch(getFilePath());
    } else throw new Error(`No content found in the file [code: ${Math.floor(Math.random() * 10 + 1)}]`);
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(uploadedFile());
};
