import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSignupSlice from './Slices/userSignupSlice';
import authSlice from './Slices/authSlice';
import profileSlice from './Slices/profileSlice';
import allUsersSlice from './Slices/allUsersSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  signup: userSignupSlice,
  profile: profileSlice,
  allUserProfiles: allUsersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
