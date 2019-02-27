import axios from 'axios';
import * as types from '../types';

export const updateUserDetails = user => {
  const payload = {
    username: user['cognito:username'],
    id: user.sub,
    email: user.email
  };
  return { type: types.USER_DETAILS, payload };
};
const userErrorShown = () => {
  return { type: types.USER_ERROR_SHOWN };
};
const getFiles = () => {
  return { type: types.USER_GET_FILES };
};
const gotFiles = () => {
  return { type: types.USER_GOT_FILES };
};
export const getFilePath = () => async (dispatch, getState) => {
  dispatch(getFiles());
  if (getState().user.error) dispatch(userErrorShown());
  const URL = process.env.REACT_APP_API_URL;
  const Authorization = getState().login.token;
  const { id } = getState().user;
  const options = { headers: { Authorization } };
  const payload = { id };
  try {
    const { data } = await axios.post(`${URL}/user/get-files-path`, payload, options);
    if (data.statusCode !== 200) throw new Error(data.error);
    else dispatch({ type: types.USER_ALL_FILES, payload: data.files });
  } catch (error) {
    dispatch({ type: types.USER_ERROR, payload: error.message });
  }
  dispatch(gotFiles());
};
