import { createSlice } from '@reduxjs/toolkit';
import { getList, getTaskId } from './actions';

import { SortingOrder, TInitialState } from './types';

const initialState: TInitialState = {
  isLoading: true,
  list: [],
  taskId: null,
  sort: SortingOrder.Default,
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
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

export const { setSort } = mainReducer.actions;

export default mainReducer.reducer;
