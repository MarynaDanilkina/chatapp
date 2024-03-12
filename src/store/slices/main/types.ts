export type TInitialState = {
  isLoading: boolean;
  done: null | boolean;
  list: ListProps[];
  taskId: ListProps | null;
};

export type ListProps = {
  id?: string;
  done: boolean;
  title: string;
  description: string;
};
