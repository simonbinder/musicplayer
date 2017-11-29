import React from 'react';
import ReactDOM from 'react-dom';

import RegisterForm from './registerForm';
import Utils from './utils';
import Actions from './actions';

// init
document.addEventListener(
  'DOMContentLoaded',
    ReactDOM.render(
      React.createElement(RegisterForm),
      document.getElementById('register'),
    );
  },
  false,
);
