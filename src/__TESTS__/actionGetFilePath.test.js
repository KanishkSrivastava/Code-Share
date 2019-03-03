import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as profileActionsGetFilePath from '../Profile/actions/actionGetFilesPath';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Actions', () => {
  let store;
  const state = { login: { token: 'eyJraWQiOiJ5OVw' }, user: { id: '08da-f5ba', error: 'error' } };
  const URL = `${process.env.REACT_APP_API_URL}/user/get-files-path`;

  beforeEach(() => {
    moxios.install();
    store = mockStore(state);
    store.clearActions();
  });
  afterEach(() => moxios.uninstall());

  test('should run actions for correct resoponse', async () => {
    moxios.stubRequest(URL, {
      status: 200,
      response: {
        statusCode: 200,
        body: 'Response returned for the user 08da-f5ba',
        files: { 'a89-s12': 'one/a.js', 'sa65-l98': 'two/b.cpp' }
      }
    });
    const actions = [
      { type: types.USER_GET_FILES },
      { type: types.USER_ERROR_SHOWN },
      { type: types.USER_ALL_FILES, payload: { 'a89-s12': 'one/a.js', 'sa65-l98': 'two/b.cpp' } },
      { type: types.USER_GOT_FILES }
    ];
    await store.dispatch(profileActionsGetFilePath.getFilePath());
    expect(store.getActions()).toEqual(actions);
  });

  test('should run actions if their is error in response', async () => {
    moxios.stubRequest(URL, {
      status: 200,
      response: {
        statusCode: 500,
        body: 'Response returned for the user 08da-f5ba',
        error: 'internal server error'
      }
    });
    const actions = [
      { type: types.USER_GET_FILES },
      { type: types.USER_ERROR_SHOWN },
      { type: types.USER_ERROR, payload: 'internal server error' },
      { type: types.USER_GOT_FILES }
    ];
    await store.dispatch(profileActionsGetFilePath.getFilePath());
    expect(store.getActions()).toEqual(actions);
  });
});
