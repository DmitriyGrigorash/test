import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
