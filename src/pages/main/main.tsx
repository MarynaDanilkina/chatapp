import Loading from 'components/Loading';
import { useAppDispatch, useAppSelector } from 'interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteList,
  getList,
  updateListDoneStatus,
} from 'store/slices/main/actions';
import { Checkbox, Form, Select } from 'antd';
import { ListProps, SortingOrder } from 'store/slices/main/types';
import { ROUTES } from 'data/Routes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { setSort } from 'store/slices/main';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const MainPage = () => {
  const storedList = localStorage.getItem('list');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, list, sort } = useAppSelector((state) => state.main);
  const [newList, setNewList] = useState<Array<ListProps>>(
    storedList ? JSON.parse(storedList) : list,
  );

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(newList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNewList(items);
    localStorage.setItem('list', JSON.stringify(items));
  }

  const onChange = (e: CheckboxChangeEvent, id: string) => {
    dispatch(updateListDoneStatus({ id: id, done: e.target.checked }));
  };

  const deleteTask = ({ id }: { id: string }) => {
    dispatch(deleteList({ listId: id })).then(() => {
      dispatch(getList({ sort }));
    });
  };

  const goToCreate = () => {
    navigate(ROUTES.CREATE);
  };

  useEffect(() => {
    dispatch(getList({ sort }));
  }, [dispatch, sort]);

  useEffect(() => {
    setNewList(storedList ? JSON.parse(storedList) : list);
  }, [list]);

  useEffect(() => {
    if (storedList) {
      setNewList(JSON.parse(storedList));
    }
  }, [storedList]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main_container">
      <div className="button_container">
        <button className="button" onClick={goToCreate}>
          Create new task
        </button>
        <Form.Item label="Sort by" className="sort-form_form-item">
          <Select
            defaultValue={sort}
            options={Object.values(SortingOrder).map((el) => ({
              label: el,
              value: el,
            }))}
            onChange={(v) => dispatch(setSort(v))}
          />
        </Form.Item>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="wrapper_list"
            >
              {newList.map(({ id, title, description, done }, index) => {
                return (
                  <Draggable key={id} draggableId={id!} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="done">
                          <Checkbox
                            defaultChecked={done}
                            onChange={(e) => onChange(e, id!)}
                          />
                        </div>
                        <p className="title">{title}</p>
                        <p className="description">{description}</p>
                        <div className="actions_container">
                          <button onClick={() => deleteTask({ id: id! })}>
                            <img
                              src="/svg/delete.svg"
                              alt="delete"
                              width={20}
                              height={20}
                            />
                          </button>
                          <button>
                            <Link to={`${ROUTES.EDIT}/${id}`}>
                              <img
                                src="/svg/edit.svg"
                                alt="edit"
                                width={20}
                                height={20}
                              />
                            </Link>
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainPage;
