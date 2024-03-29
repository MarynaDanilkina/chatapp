import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListProps, SortingOrder } from './types';

export const getList = createAsyncThunk(
  'main/getList',
  async ({ sort }: { sort?: SortingOrder }) => {
    const doneParams =
      sort === SortingOrder.Done
        ? 'done=1'
        : sort === SortingOrder.Undone
          ? 'done=0'
          : '';
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
    return data;
  },
);
export const getTaskId = createAsyncThunk(
  'main/getTaskId',
  async ({ id }: { id: string }) => {
    const url = `http://localhost:3004/todoList/${id}`;

    const response = await fetch(url);
    const data = (await response.json()) as ListProps;
    return data;
  },
);
export const updateList = createAsyncThunk(
  'main/updateList',
  async ({
    id,
    updatedTaskData,
  }: {
    id: string;
    updatedTaskData: ListProps;
  }) => {
    const response = await fetch(`http://localhost:3004/todoList/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskData),
    });
    const data = await response.json();
    return data;
  },
);
export const updateListDoneStatus = createAsyncThunk(
  'main/updateListDoneStatus',
  async ({ id, done }: { id: string; done: boolean }) => {
    const response = await fetch(`http://localhost:3004/todoList/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done }),
    });
    const data = await response.json();
    return data;
  },
);
