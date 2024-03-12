export type TInitialState = {
  isLoading: boolean;
  done: null | boolean;
  list: ListProps[];
};

export type ListProps = {
  id: number;
  done: boolean;
  title: string;
  description: string;
};
