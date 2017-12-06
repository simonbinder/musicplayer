import React from 'react';
import ReactDOM from 'react-dom';

import Utils from './utils';
import Actions from './actions';
import RootRouter from './router';
import './assets/main.scss';

ReactDOM.render(
  <RootRouter />,
  document.getElementById('app')
);
