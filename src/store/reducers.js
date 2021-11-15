import { combineReducers } from '@reduxjs/toolkit';

export const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    ...injectedReducers,
  });
};
