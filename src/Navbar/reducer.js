import * as types from '../types';

const initialState = { loading: false, login: { status: false, accessToken: null }, err: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_ACTION_SEND:
      return { ...state, loading: true };
    case types.LOGIN_ACTION_RECEIVED:
      return { ...state, loading: false };
    case types.USER_LOGIN_DATA:
      return { ...state, login: { status: true, accessToken: action.payload } };
    case types.USER_LOGIN_ERROR:
      return { ...state, err: action.payload };
    case types.LOGIN_ERROR_SHOWN:
      return { ...state, err: null };
    default:
      return state;
  }
};
