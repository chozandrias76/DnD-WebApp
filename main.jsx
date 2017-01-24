import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
require('./stylesheets/styles.scss');

ReactDOM.render(
  <Client />,
  document.body.appendChild(document.createElement('div'))
);
