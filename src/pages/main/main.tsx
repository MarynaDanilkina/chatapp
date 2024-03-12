import Loading from 'components/Loading';
import { useAppDispatch, useAppSelector } from 'interfaces/interfaces';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteList, getList } from 'store/slices/main/actions';
import { Checkbox, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ListProps } from 'store/slices/main/types';
import { ROUTES } from 'data/Routes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, done, list } = useAppSelector((state) => state.main);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log('checked = ', e.target.checked);
  };

  const deleteTask = ({ id }: { id: string }) => {
    dispatch(deleteList({ listId: id })).then(() => {
      dispatch(getList({ done }));
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
          <Checkbox defaultChecked={value.done} onChange={onChange} />
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
    dispatch(getList({ done }));
  }, [dispatch, done]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main_container">
      <div className="button_container">
        <button className="button" onClick={goToCreate}>
          Create new task
        </button>
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
