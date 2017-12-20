import React from 'react';
import ReactDOM from 'react-dom';

import Utils from './utils';
import Actions from './actions';
import RootRouter from './router';
import './assets/index.scss';

const store = Utils.createStore();
console.log('Created store', store);

fetch('http://localhost:4000/spotify/refresh_token', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'refresh_token': 'test',
  })
})
.then(response => response.json())
.then(response => {
  if(response.error) {
    console.error('Error while requesting refresh token', response);
  } else {
    console.log('Refresh token response', response);
  }
})
.catch(error => console.log('Refresh token error', error))

ReactDOM.render(
  <RootRouter store={store} />,
  document.getElementById('app')
);
