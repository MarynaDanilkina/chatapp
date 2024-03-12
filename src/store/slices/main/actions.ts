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
export const createList = createAsyncThunk(
  'main/createList',
  async ({ listData }: { listData: ListProps }) => {
    const response = await fetch('http://localhost:3004/todoList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });
    const data = await response.json();
    return data;
  },
);
export const deleteList = createAsyncThunk(
  'main/deleteList',
  async ({ listId }: { listId: string }) => {
    const response = await fetch(`http://localhost:3004/todoList/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listId),
    });
    const data = await response.json();
    console.log(data);
    return data;
  },
);
