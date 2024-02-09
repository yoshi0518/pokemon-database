import { Checkbox, CheckboxProps } from '@mantine/core';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaCheckbox.module.scss';

/**
 * @field label ラベル
 * @field checked チェック有無
 * @field color カラー
 * @field variant 種類
 * @field disabled 無効
 * @field description 説明
 * @field error エラー
 * @see https://mantine.dev/core/checkbox/
 */
export type NaCheckboxProps = ComponentPropsWithRef<'input'> &
  Omit<CheckboxProps, 'color' | 'variant'> & {
    color?: 'default' | 'info' | 'success' | 'warning' | 'danger';
    variant?: 'filled' | 'outline';
  };

const getColor = (color: string) => {
  switch (color) {
    case 'default':
      return 'gray';
    case 'info':
      return 'blue';
    case 'success':
      return 'emerald';
    case 'warning':
      return 'yellow';
    case 'danger':
      return 'rose';
    default:
      return 'gray';
  }
};

/** NaCheckbox(共通UI) */
export const NaCheckbox: FC<NaCheckboxProps> = forwardRef(
  (
    { label, color = 'default', variant = 'filled', description = '', error = '', className = '', ...otherProps },
    ref,
  ) => (
    <div className={className}>
      <Checkbox
        {...otherProps}
        label={label}
        color={getColor(color)}
        variant={variant}
        description={description}
        error={error}
        classNames={{
          inner: classes.inner,
          error: classes.error,
        }}
        ref={ref}
      />
    </div>
  ),
);
