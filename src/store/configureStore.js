import { configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';

export const configureAppStore = (initialState) => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;
  const middleware = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: middleware,
    enhancers,
  });

  return store;
};
