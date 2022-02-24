import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSignupSlice from './Slices/userSignupSlice';
import authSlice from './Slices/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  signup: userSignupSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
