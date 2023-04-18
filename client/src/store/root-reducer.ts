import { combineReducers } from '@reduxjs/toolkit';
import { reducer as itemReducer } from '../slices/item';
import { reducer as orderReducer } from '../slices/order';
import { reducer as commentReducer } from '../slices/comment';

export const rootReducer = combineReducers({
  item: itemReducer,
  comment: commentReducer,
  order: orderReducer,
});
