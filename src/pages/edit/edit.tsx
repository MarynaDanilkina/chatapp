import { schema as createTodoListSchema } from 'pages/create/create';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskId, updateList } from 'store/slices/main/actions';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'interfaces/interfaces';
import { Checkbox, Form } from 'antd';
import { ROUTES } from 'data/Routes';
import Loading from 'components/Loading';
import { FormInput } from 'components/Input';
import { TextArea } from 'components/TextArea';

const schema = createTodoListSchema.clone();
type IForm = InferType<typeof schema>;

const EditPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  if (!id) {
    throw new Error();
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { taskId } = useAppSelector((state) => state.main);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      dispatch(getTaskId({ id }));
    }
  }, [dispatch, id]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (id) {
      dispatch(
        updateList({
          id: id,
          updatedTaskData: {
            title: data.title,
            description: data.description,
            done: data.done,
          },
        }),
      );
      navigate(ROUTES.MAIN);
    }
  };

  if (!taskId) {
    return <Loading />;
  }

  return (
    <div className="form_container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <FormInput
          defaultValue={taskId?.title}
          error={errors.title}
          label="title"
          {...register('title')}
        />
        <Controller
          name="description"
          defaultValue={taskId?.description}
          control={control}
          render={({ field: { value, ref, onChange } }) => (
            <TextArea
              value={value}
              error={errors.description}
              ref={ref}
              onChange={onChange}
              label="description"
            />
          )}
        />
        <Controller
          name="done"
          control={control}
          defaultValue={taskId?.done}
          render={({ field: { ...rest } }) => (
            <Form.Item label="done">
              <Checkbox
                {...rest}
                defaultChecked={taskId?.done}
                onChange={(e) => setValue('done', e.target.checked)}
                checked={rest.value}
              />
            </Form.Item>
          )}
        />
        <button className="button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;
