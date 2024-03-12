import { createSlice } from '@reduxjs/toolkit';
import { getList, getTaskId } from './actions';

import type { TInitialState } from './types';

const initialState: TInitialState = {
  isLoading: true,
  done: null,
  list: [],
  taskId: null,
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.taskId = null;
      state.isLoading = false;
    });
    builder.addCase(getTaskId.fulfilled, (state, action) => {
      state.taskId = action.payload;
    });
  },
});

export default mainReducer.reducer;
