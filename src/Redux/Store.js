import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userAuthReducer from './Slices/authSlice';

const rootReducer = combineReducers({
  auth: userAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
