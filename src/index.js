import React from 'react';
import ReactDOM from 'react-dom';

import Utils from './utils';
import Actions from './actions';
import RootRouter from './router';
import './assets/index.scss';

const store = Utils.createStore();
console.log('Created store', store);

ReactDOM.render(
  <RootRouter store={store} />,
  document.getElementById('app')
);
