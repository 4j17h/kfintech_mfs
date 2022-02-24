import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSignupSlice from './Slices/userSignupSlice';
import authSlice from './Slices/authSlice';
import profileSlice from './Slices/profileSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  signup: userSignupSlice,
  profile: profileSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
