import axios from 'axios';
import * as types from '../../types';

import { userError, userErrorShown } from '../../utils/actionUtils';
import { getKeyByValue } from '../..//utils/generalFunctions';

export const getFileStatus = () => async (dispatch, getState) => {
  if (getState().user.error) await dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const fileIdsAndPath = getState().user.allFiles;
  const { selectedFilePath } = getState().user;
  const fileId = getKeyByValue(fileIdsAndPath, selectedFilePath);
  const options = { headers: { Authorization } };
  const payload = { id, fileId };
  try {
    const { data } = await axios.post(`${URL}/user/get-file-status`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else dispatch({ type: types.USER_FILE_STATUS, payload: { selectedFileStatus: data.status } });
  } catch (error) {
    dispatch(userError(error));
  }
};
