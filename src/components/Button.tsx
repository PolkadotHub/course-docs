import { Component, JSX, mergeProps } from 'solid-js';

import clsx from 'clsx';

export interface ButtonProps {
  onClick: () => void;
  variant?: 'green' | 'purple';
  children?: JSX.Element;
}

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps({ variant: 'green' }, props);
  const backgroundColorClass = merged.variant === 'green' ? 'bg-green' : 'bg-purple';
  
  return (
    <button onClick={merged.onClick} class={clsx('rounded px-5 py-3', backgroundColorClass)}>
      {props.children}
    </button>
  );
};
