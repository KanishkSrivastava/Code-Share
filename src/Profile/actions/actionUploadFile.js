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
    const { data } = await axios.post(`${URL}/user/upload-file`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else {
      dispatch(getFilePath());
    }
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(uploadedFile());
};
