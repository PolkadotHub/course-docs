import { Component, JSX, mergeProps } from 'solid-js';

import clsx from 'clsx';

export interface ButtonProps {
  onClick: () => void;
  variant?: 'orange' | 'green' | 'purple';
  children?: JSX.Element;
}

const getBackgroundColorClass = (variant: NonNullable<ButtonProps['variant']>) => {
  if (variant === 'orange') {
    return 'bg-orange';
  } else if (variant === 'green') {
    return 'bg-green';
  }
  return 'bg-purple';
}

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps({ variant: 'green' }, props);
  const backgroundColorClass = getBackgroundColorClass(merged.variant);
  
  return (
    <button onClick={merged.onClick} class={clsx('rounded px-5 py-3', backgroundColorClass)}>
      {props.children}
    </button>
  );
};
