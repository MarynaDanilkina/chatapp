import React from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string, InferType, boolean } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'interfaces/interfaces';
import { Checkbox, Form } from 'antd';
import { FormInput } from 'components/Input';
import { TextArea } from 'components/TextArea';
import { createList } from 'store/slices/main/actions';
import { ROUTES } from 'data/Routes';

export const schema = object({
  title: string().min(3).required(),
  description: string().min(3).required(),
  done: boolean().required(),
});

type IForm = InferType<typeof schema>;

const CreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log(data);
    dispatch(
      createList({
        listData: {
          title: data.title,
          description: data.description,
          done: data.done,
        },
      }),
    );
    navigate(ROUTES.MAIN);
  };

  return (
    <div className="form_container">
      <form className="form_create" onSubmit={handleSubmit(onSubmit)}>
        <FormInput error={errors.title} label="title" {...register('title')} />
        <Controller
          name="description"
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
          defaultValue={false}
          render={({ field: { ...rest } }) => (
            <Form.Item label="done">
              <Checkbox
                {...rest}
                defaultChecked={false}
                onChange={(e) => setValue('done', e.target.checked)}
                checked={rest.value}
              />
            </Form.Item>
          )}
        />
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
