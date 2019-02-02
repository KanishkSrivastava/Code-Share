import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import login from './Navbar/reducer';

export default history => combineReducers({ router: connectRouter(history), login });
