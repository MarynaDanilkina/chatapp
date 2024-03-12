import React from 'react';
import {
  AriaAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

import { FieldError } from 'react-hook-form';
import { Transition } from '@headlessui/react';

interface IProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    AriaAttributes {
  error?: FieldError;
  label: string;
}

const FormInput = forwardRef(
  (
    { error, type = 'text', label, ...props }: IProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="input_container">
        <div className="label">{label}</div>
        <input ref={ref} type={type} autoComplete="none" {...props} />
        <Transition show={!!error}>
          <Transition.Child
            className="opacity-0"
            enter="transition-opacity ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="error">{error && error.message}</div>
          </Transition.Child>
        </Transition>
      </div>
    );
  },
);

export default FormInput;
