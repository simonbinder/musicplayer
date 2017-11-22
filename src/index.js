import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Utils from './utils';
import Actions from './actions';

// init
document.addEventListener(
  'DOMContentLoaded',
  function() {
    const store = Utils.createStore();
    Actions.loadCourses(store);

    ReactDOM.render(
      React.createElement(App, { store: store }),
      document.getElementById('app'),
    );
  },
  false,
);
