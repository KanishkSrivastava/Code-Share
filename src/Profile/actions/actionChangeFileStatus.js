import axios from 'axios';
import * as types from '../../types';

import { userError, userErrorShown } from '../../utils/actionUtils';
import { getFileStatus } from './actionGetFileStatus';
import { getKeyByValue } from '../..//utils/generalFunctions';

const changingFileStatus = () => {
  return { type: types.USER_CHANGING_FILE_STATUS };
};
const changedFileStatus = () => {
  return { type: types.USER_CHANGED_FILE_STATUS };
};

export const changeFileStatus = status => async (dispatch, getState) => {
  dispatch(changingFileStatus());
  if (getState().user.error) await dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const fileIdsAndPath = getState().user.allFiles;
  const { selectedFilePath } = getState().user;
  const fileId = getKeyByValue(fileIdsAndPath, selectedFilePath);
  const options = { headers: { Authorization } };
  const payload = { id, fileId, status };
  try {
    const { data } = await axios.post(`${URL}/user/change-file-status`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else dispatch(getFileStatus());
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(changedFileStatus());
};
