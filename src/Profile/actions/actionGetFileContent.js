import axios from 'axios';
import * as types from '../../types';

import { userErrorShown, userError } from './actionGetFilesPath';

const getFileContent = () => {
  return { type: types.USER_GET_FILE_CONTENT };
};
const gotFileContent = () => {
  return { type: types.USER_GOT_FILE_CONTENT };
};
const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};
export const fileContent = filePath => async (dispatch, getState) => {
  dispatch(getFileContent());
  if (getState().user.error) dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const fileIdsAndPath = getState().user.allFiles;
  const key = getKeyByValue(fileIdsAndPath, filePath);
  const options = { headers: { Authorization } };
  const payload = { id, key };
  try {
    const { data } = await axios.post(`${URL}/user/get-file`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else dispatch({ type: types.USER_FILE_CONTENT, payload: data.content });
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(gotFileContent());
};