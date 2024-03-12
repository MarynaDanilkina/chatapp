import React from 'react';
import {
  AriaAttributes,
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useRef,
} from 'react';

import { FieldError } from 'react-hook-form';
import { Transition } from '@headlessui/react';

interface IProps
  extends DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    AriaAttributes {
  error?: FieldError;
  label: string;
}

const TextArea = forwardRef(
  (
    { error, label, onChange, value, ...props }: IProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    const textareaResize = () => {
      if (localRef && localRef.current) {
        const textarea = localRef.current.querySelector(
          'textarea',
        ) as HTMLTextAreaElement;
        textarea.style.height = '0px';
        const scrollHeight = textarea.scrollHeight;

        textarea.style.height = scrollHeight + 'px';

        if (drawerRef && drawerRef.current) {
          drawerRef.current.style.height = scrollHeight + 'px';
        }
      }
    };

    useEffect(() => {
      textareaResize();
    }, [value, localRef]);

    return (
      <div ref={localRef} className="textArea_container">
        <div className="label">{label}</div>
        <textarea
          onChange={(e) => {
            // @ts-ignore:next-line
            onChange && onChange(e.target.value);
          }}
          value={value}
          ref={ref}
          {...props}
        />

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

export default TextArea;
