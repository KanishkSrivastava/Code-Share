import axios from 'axios';
import * as types from '../../types';

import { userErrorShown, userError } from '../../utils/actionUtils';
import { getKeyByValue } from '../..//utils/generalFunctions';

const getFileContent = () => {
  return { type: types.USER_GET_FILE_CONTENT };
};
const gotFileContent = () => {
  return { type: types.USER_GOT_FILE_CONTENT };
};

export const fileContent = (filePath, fileName) => async (dispatch, getState) => {
  dispatch(getFileContent());
  if (getState().user.error) dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const fileIdsAndPath = getState().user.allFiles;
  const key = getKeyByValue(fileIdsAndPath, filePath);
  const options = { headers: { Authorization } };
  const payload = { id, key };
  const fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1, filePath.length) || 'cpp';
  try {
    const { data } = await axios.post(`${URL}/user/get-file`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else {
      const payload = {
        selectedFilePath: filePath,
        selectedFileName: fileName,
        selectedFileContent: data.content,
        ext: fileExtension
      };
      dispatch({ type: types.USER_FILE_CONTENT, payload });
    }
  } catch (error) {
    dispatch(userError(error));
  }
  dispatch(gotFileContent());
};
