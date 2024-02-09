import { Checkbox, CheckboxGroupProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaBaseCheckboxGroup.module.scss';

/**
 * @field label ラベル
 * @field value 値
 * @field disabled 無効
 * @see https://mantine.dev/core/checkbox/
 */
export type NaBaseCheckboxItemProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

/**
 * @field value チェック中の値リスト
 * @fielc checkboxItems チェックボックスリスト
 * @field color カラー
 * @field variant 種類
 * @field inline 並び方向
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/core/checkbox/
 */
export type NaBaseCheckboxGroupProps = ComponentPropsWithRef<'input'> &
  Omit<CheckboxGroupProps, 'children' | 'color'> & {
    checkboxItems: NaBaseCheckboxItemProps[];
    color?: 'default' | 'info' | 'success' | 'warning' | 'danger';
    variant?: 'filled' | 'outline';
    inline?: boolean;
    disabled?: boolean;
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

/** NaBaseCheckboxGroup(共通UI) */
export const NaBaseCheckboxGroup: FC<NaBaseCheckboxGroupProps> = forwardRef(
  (
    {
      value,
      checkboxItems,
      color = 'default',
      variant = 'filled',
      inline = false,
      disabled = false,
      label = '',
      description = '',
      error = '',
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div className={className}>
      <Checkbox.Group
        {...otherProps}
        value={value}
        label={label}
        description={description}
        error={error}
        classNames={{
          error: classes.error,
        }}
        ref={ref}
      >
        {checkboxItems.map((item) => (
          <div
            key={item.value}
            className={clsx('mt-2', {
              'block': !inline,
              'inline-block': inline,
              'mr-2': inline,
            })}
          >
            <Checkbox
              label={item.label}
              value={item.value}
              color={getColor(color)}
              variant={variant}
              disabled={disabled || item.disabled}
            />
          </div>
        ))}
      </Checkbox.Group>
    </div>
  ),
);
