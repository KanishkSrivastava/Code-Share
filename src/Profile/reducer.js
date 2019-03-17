import * as types from '../types';

const initialState = {
  email: null,
  username: null,
  id: null,
  error: null,
  allFiles: {},
  loading: false,
  loadingFileContent: false,
  loadingUploadingFile: false,
  selectedFileName: '',
  selectedFileContent: '',
  ext: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_GET_FILES:
      return { ...state, loading: true };
    case types.USER_GOT_FILES:
      return { ...state, loading: false };
    case types.USER_DETAILS:
      const { username, id, email } = action.payload;
      return { ...state, username, id, email };
    case types.USER_ERROR:
      const error = action.payload;
      return { ...state, error };
    case types.USER_ERROR_SHOWN:
      return { ...state, error: null };
    case types.USER_ALL_FILES:
      const allFiles = action.payload;
      return { ...state, allFiles };
    case types.USER_GET_FILE_CONTENT:
      return { ...state, loadingFileContent: true };
    case types.USER_GOT_FILE_CONTENT:
      return { ...state, loadingFileContent: false };
    case types.USER_FILE_CONTENT:
      const { selectedFileName, selectedFileContent, ext } = action.payload;
      return { ...state, selectedFileName, selectedFileContent, ext };
    case types.USER_UPLOADING_FILE:
      return { ...state, loadingUploadingFile: true };
    case types.USER_UPLOADED_FILE:
      return { ...state, loadingUploadingFile: false };
    default:
      return state;
  }
};
