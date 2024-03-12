import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListProps } from './types';

export const getList = createAsyncThunk(
  'main/getList',
  async ({ done }: { done?: boolean | null }) => {
    const doneParams = done ? 'done=1' : '';
    const url = `http://localhost:3004/todoList?${doneParams}`;

    const response = await fetch(url);
    const data = (await response.json()) as ListProps[];
    return data;
  },
);
