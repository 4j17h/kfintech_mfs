import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signup} from '../../Common/ApiConfig';

export const signupUser = createAsyncThunk('user/signup', async body => {
  const response = await fetch(signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const respData = await response.json();
  return respData;
});

const userSignup = createSlice({
  name: 'userSignup',
  initialState: {
    processing: false,
    success: false,
    token: null,
    id: null,
  },
  reducers: {
    submit: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(signupUser.pending, state => {
      state.processing = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.token = action.payload?.token || null;
      state.id = action.payload?.id || null;
      state.processing = false;
      state.success = action.payload?.token ? true : false;
    });
    builder.addCase(signupUser.rejected, state => {
      state.processing = false;
      state.success = false;
    });
  },
});

export const {submit} = userSignup.actions;

export default userSignup.reducer;
