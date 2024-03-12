import { createSlice } from '@reduxjs/toolkit';
import { getList } from './actions';

import type { TInitialState } from './types';

const initialState: TInitialState = {
  isLoading: true,
  done: null,
  list: [],
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
      state.isLoading = false;
    });
  },
});

export default mainReducer.reducer;
