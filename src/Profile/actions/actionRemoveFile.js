import axios from 'axios';
import * as types from '../../types';

import { userErrorShown, userError } from '../../utils/actionUtils';
import { getFilePath } from './actionGetFilesPath';
import { getKeyByValue } from '../..//utils/generalFunctions';

const fileDeleting = () => {
  return { type: types.USER_DELETING_FILE };
};
const fileDeleted = () => {
  return { type: types.USER_DELETED_FILE };
};

export const fileDelete = () => async (dispatch, getState) => {
  dispatch(fileDeleting());
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
    const { data } = await axios.post(`${URL}/user/delete-file`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else {
      await dispatch(getFilePath());
      dispatch({ type: types.USER_DELETE_FILE });
    }
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(fileDeleted());
};
