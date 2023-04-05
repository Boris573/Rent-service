import { combineReducers } from '@reduxjs/toolkit';
import { reducer as itemReducer } from '../slices/item';

export const rootReducer = combineReducers({
  item: itemReducer,
});
