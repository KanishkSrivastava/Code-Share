import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import login from './Navbar/reducer';
import user from './Profile/reducer';

export default history => combineReducers({ router: connectRouter(history), login, user });
