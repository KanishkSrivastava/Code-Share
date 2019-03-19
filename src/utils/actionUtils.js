import * as types from '../types';

export const userErrorShown = () => {
  return { type: types.USER_ERROR_SHOWN };
};
export const userError = error => {
  return { type: types.USER_ERROR, payload: error.message };
};
