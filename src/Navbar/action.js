import { Auth } from 'aws-amplify';

import '../aws_config';
import * as types from '../types';

const loginActionSend = () => {
  return { type: types.LOGIN_ACTION_SEND };
};
const loginActionReceived = () => {
  return { type: types.LOGIN_ACTION_RECEIVED };
};
const loginErrorShown = () => {
  return { type: types.LOGIN_ERROR_SHOWN };
};
export const loginAction = (username, password) => async (dispatch, getState) => {
  if (getState().login.err) dispatch(loginErrorShown());
  dispatch(loginActionSend());
  try {
    const { signInUserSession } = await Auth.signIn({ username, password });
    dispatch({
      type: types.USER_LOGIN_DATA,
      payload: signInUserSession.accessToken.jwtToken
    });
  } catch (err) {
    dispatch({ type: types.USER_LOGIN_ERROR, payload: err.message });
  }
  dispatch(loginActionReceived());
};
