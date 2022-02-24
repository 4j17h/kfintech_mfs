import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userProfile} from '../../Common/ApiConfig';

export const getProf = createAsyncThunk('user/getProf', async id => {
  const response = await fetch(userProfile + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const respData = await response.json();
  return respData;
});

const profSlice = createSlice({
  name: 'profSlice',
  initialState: {
    processing: false,
    isLoggedIn: false,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    profilePhoto: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProf.pending, state => {
      state.processing = true;
    });
    builder.addCase(getProf.fulfilled, (state, action) => {
      state.processing = false;
      state.isLoggedIn = action.payload?.data ? true : false;
      state.id = action.payload?.data?.id;
      state.email = action.payload?.data?.email;
      state.firstName = action.payload?.data?.first_name;
      state.lastName = action.payload?.data?.last_name;
      state.profilePhoto = action.payload?.data?.avatar;
    });
    builder.addCase(getProf.rejected, state => {
      state.processing = false;
      state.isLoggedIn = false;
    });
  },
});

export const {logout} = profSlice.actions;

export default profSlice.reducer;
