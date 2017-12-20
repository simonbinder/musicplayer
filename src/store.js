import { createStore, applyMiddleware, combineReducers } from 'redux';
import searchReducer from './reducer/searchReducer';
import { createLogger } from 'redux-logger';
import credentialsReducer from './reducer/credentialsReducer';

const store = createStore(
  combineReducers({
    search: searchReducer,
    credentials: credentialsReducer,
  }),
  applyMiddleware(createLogger())
);

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;
