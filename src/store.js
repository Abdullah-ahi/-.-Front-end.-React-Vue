import { createStore, applyMiddleware } from 'redux';
import { initReducer } from 'reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const store = createStore(
  initReducer(history),
  applyMiddleware(routerMiddleware(history))
)