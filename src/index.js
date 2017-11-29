import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Utils from './utils';
import Actions from './actions';
import RootRouter from './router';

ReactDOM.render(
  <RootRouter />,
  document.getElementById('app')
);

// // init
// document.addEventListener(
//   'DOMContentLoaded',
//   function() {
//     ReactDOM.render(
//       React.createElement(App),
//       document.getElementById('app'),
//     );
//   },
//   false,
// );
