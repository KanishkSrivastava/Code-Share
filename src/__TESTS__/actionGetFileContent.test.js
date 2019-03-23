import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as profileActionsGetContent from '../Profile/actions/actionGetFileContent';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Actions', () => {
  let store;
  const state = {
    login: { token: 'eyJraWQiOiJ5OVw' },
    user: { id: '08da-f5ba', error: 'error', allFiles: { 'a89-s12': 'one/a.js', 'sa65-l98': 'two/b.cpp' } }
  };
  const URLforContent = `${process.env.REACT_APP_API_URL}/user/get-file`;
  const URLforStatus = `${process.env.REACT_APP_API_URL}/user/get-file-status`;
  const file = 'one/a.js';
  const fileName = 'one';
  beforeEach(() => {
    moxios.install();
    store = mockStore(state);
    store.clearActions();
  });
  afterEach(() => moxios.uninstall());

  test('should run actions for correct resoponse', async () => {
    moxios.stubRequest(URLforContent, {
      status: 200,
      response: {
        statusCode: 200,
        body: 'Response returned file id a89-s12',
        content: 'Code Written In File'
      }
    });
    moxios.stubRequest(URLforStatus, {
      status: 200,
      response: {
        statusCode: 200,
        status: 'Response returned file id a89-s12',
        status: true
      }
    });
    const actions = [
      { type: 'USER_GET_FILE_CONTENT' },
      { type: 'USER_ERROR_SHOWN' },
      {
        type: 'USER_FILE_CONTENT',
        payload: { ext: 'js', selectedFileContent: 'Code Written In File', selectedFileName: 'one', selectedFilePath: 'one/a.js' }
      },
      { type: 'USER_ERROR_SHOWN' },
      { type: 'USER_FILE_STATUS', payload: { selectedFileStatus: true } },
      { type: 'USER_GOT_FILE_CONTENT' }
    ];
    await store.dispatch(profileActionsGetContent.fileContent(file, fileName));
    expect(store.getActions()).toEqual(actions);
  });
  test('should run actions if their is error in response', async () => {
    moxios.stubRequest(URLforContent, {
      status: 200,
      response: {
        statusCode: 500,
        body: 'Response returned for file id a89-s12',
        error: 'internal server error'
      }
    });
    const actions = [
      { type: types.USER_GET_FILE_CONTENT },
      { type: types.USER_ERROR_SHOWN },
      { type: types.USER_ERROR, payload: 'internal server error' },
      { type: types.USER_GOT_FILE_CONTENT }
    ];
    await store.dispatch(profileActionsGetContent.fileContent(file));
    expect(store.getActions()).toEqual(actions);
  });
});
