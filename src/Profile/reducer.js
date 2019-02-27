import * as types from '../types';

const initialState = { email: null, username: null, id: null, error: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DETAILS:
      const { username, id, email } = action.payload;
      return { ...state, username, id, email };
    case types.USER_ERROR:
      const error = action.payload;
      return { ...state, error };
    case types.USER_ERROR_SHOWN:
      return { ...state, error: null };
    default:
      return state;
  }
};
