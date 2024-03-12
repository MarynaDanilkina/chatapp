import Loading from 'components/Loading';
import { useAppDispatch, useAppSelector } from 'interfaces/interfaces';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteList,
  getList,
  updateListDoneStatus,
} from 'store/slices/main/actions';
import { Checkbox, Form, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ListProps, SortingOrder } from 'store/slices/main/types';
import { ROUTES } from 'data/Routes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { setSort } from 'store/slices/main';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, list, sort } = useAppSelector((state) => state.main);

  const onChange = (e: CheckboxChangeEvent, id: string) => {
    dispatch(updateListDoneStatus({ id: id, done: e.target.checked }));
  };

  const deleteTask = ({ id }: { id: string }) => {
    dispatch(deleteList({ listId: id })).then(() => {
      dispatch(getList({ sort }));
    });
  };

  const columns: TableColumnsType<ListProps> = [
    {
      key: 'dragHandle',
      dataIndex: 'dragHandle',
      title: 'Drag',
      width: 30,
      render: () => <MenuOutlined />,
    },
    {
      title: 'Done',
      render: (value) => (
        <div>
          <Checkbox
            defaultChecked={value.done}
            onChange={(e) => onChange(e, value.id)}
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (value) => (
        <div className="actions_container">
          <button onClick={() => deleteTask({ id: value.id })}>
            <img src="/svg/delete.svg" alt="delete" width={20} height={20} />
          </button>
          <button>
            <Link to={`${ROUTES.EDIT}/${value.id}`}>
              <img src="/svg/edit.svg" alt="edit" width={20} height={20} />
            </Link>
          </button>
        </div>
      ),
    },
  ];

  const goToCreate = () => {
    navigate(ROUTES.CREATE);
  };

  useEffect(() => {
    dispatch(getList({ sort }));
  }, [dispatch, sort]);

  console.log(sort);

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
      <Table
        className="main_table"
        pagination={false}
        rowKey="id"
        columns={columns}
        dataSource={list}
      />
    </div>
  );
};

export default MainPage;
