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
  loadingDeletingFile: false,
  loadingChangeFileStatus: false,
  selectedFileName: '',
  selectedFilePath: '',
  selectedFileStatus: false,
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
      const { selectedFileName, selectedFilePath, selectedFileContent, ext } = action.payload;
      return { ...state, selectedFileName, selectedFilePath, selectedFileContent, ext };
    case types.USER_UPLOADING_FILE:
      return { ...state, loadingUploadingFile: true };
    case types.USER_UPLOADED_FILE:
      return { ...state, loadingUploadingFile: false };
    case types.USER_CHANGE_SELECTED_FILE_NAME:
      return { ...state, selectedFileName: action.payload.selectedFileName, selectedFilePath: action.payload.selectedFilePath };
    case types.USER_DELETING_FILE:
      return { ...state, loadingDeletingFile: true };
    case types.USER_DELETED_FILE:
      return { ...state, loadingDeletingFile: false };
    case types.USER_DELETE_FILE:
      return { ...state, selectedFileName: '', selectedFilePath: '', selectedFileContent: '' };
    case types.USER_FILE_STATUS:
      const { selectedFileStatus } = action.payload;
      return { ...state, selectedFileStatus };
    case types.USER_CHANGING_FILE_STATUS:
      return { ...state, loadingChangeFileStatus: true };
    case types.USER_CHANGED_FILE_STATUS:
      return { ...state, loadingChangeFileStatus: false };
    default:
      return state;
  }
};
