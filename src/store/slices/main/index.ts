import { createSlice } from '@reduxjs/toolkit';

import type { TInitialState } from './types';

const initialState: TInitialState = {
  isLoading: true,
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {},
});

export default mainReducer.reducer;
