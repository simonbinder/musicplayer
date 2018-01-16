import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('app')
);
