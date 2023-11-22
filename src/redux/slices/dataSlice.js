import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
