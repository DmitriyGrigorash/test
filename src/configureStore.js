import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
    preloadedState,
    enhancers: []
  });

  return store;
}
