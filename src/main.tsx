import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const images = import.meta.globEager('../assets/*.png');

import App from './App';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
