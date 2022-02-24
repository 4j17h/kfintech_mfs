import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {allUserProfiles} from '../../Common/ApiConfig';

export const getAllUsersProf = createAsyncThunk(
  'user/getAllUsersProf',
  async id => {
    const response = await fetch(allUserProfiles + '1&per_page=12', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const respData = await response.json();
    return respData;
  },
);

const allProfSlice = createSlice({
  name: 'allProfSlice',
  initialState: {
    processing: false,
    isLoggedIn: false,
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllUsersProf.pending, state => {
      state.processing = true;
    });
    builder.addCase(getAllUsersProf.fulfilled, (state, action) => {
      state.processing = false;
      state.data = action.payload?.data;
    });
    builder.addCase(getAllUsersProf.rejected, state => {
      state.processing = false;
    });
  },
});

export default allProfSlice.reducer;
