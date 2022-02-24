import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login} from '../../Common/ApiConfig';

export const getProf = createAsyncThunk('user/getProf', async body => {
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

const profSlice = createSlice({
  name: 'profSlice',
  initialState: {
    processing: false,
    isLoggedIn: false,
    id: null,
  },
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProf.pending, state => {
      state.processing = true;
    });
    builder.addCase(getProf.fulfilled, (state, action) => {
      state.token = action.payload?.token || null;
      state.processing = false;
      state.isLoggedIn = action.payload?.token ? true : false;
    });
    builder.addCase(getProf.rejected, state => {
      state.processing = false;
      state.isLoggedIn = false;
    });
  },
});

export const {logout} = profSlice.actions;

export default profSlice.reducer;
