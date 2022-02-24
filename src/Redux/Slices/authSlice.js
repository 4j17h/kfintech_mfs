import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login} from '../../Common/ApiConfig';

export const authUser = createAsyncThunk('user/authUser', async body => {
  const response = await fetch(login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const respData = await response.json();
  return respData;
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    processing: false,
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(authUser.pending, state => {
      state.processing = true;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.token = action.payload?.token || null;
      state.processing = false;
      state.isLoggedIn = action.payload?.token ? true : false;
    });
    builder.addCase(authUser.rejected, state => {
      state.processing = false;
      state.isLoggedIn = false;
    });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
