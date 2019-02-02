import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';
export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(...middleware)));
export default store;
