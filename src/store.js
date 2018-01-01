import { createStore, applyMiddleware, combineReducers } from 'redux';
import searchReducer from './reducer/searchReducer';
import { createLogger } from 'redux-logger';
import credentialsReducer from './reducer/credentialsReducer';
import thunk from 'redux-thunk';
import { verifySpotifyRefreshToken } from './actions/credentialsActions';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import playlistReducer from './reducer/playlistReducer';

const store = createStore(
  combineReducers({
    search: searchReducer,
    credentials: credentialsReducer,
    routing: routerReducer,
    playlist: playlistReducer,
  }),
  applyMiddleware(thunk, routerMiddleware(browserHistory), createLogger())
);

store.dispatch(verifySpotifyRefreshToken());

window.store = store;

export default store;
