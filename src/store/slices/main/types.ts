export type TInitialState = {
  isLoading: boolean;
  list: ListProps[];
  taskId: ListProps | null;
  sort: SortingOrder.Default;
};

export type ListProps = {
  id?: string;
  done: boolean;
  title: string;
  description: string;
};
export enum SortingOrder {
  Default = 'default',
  Done = 'done',
  Undone = 'undone',
}
