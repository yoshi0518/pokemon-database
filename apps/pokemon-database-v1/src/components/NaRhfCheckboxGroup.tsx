import { Checkbox, CheckboxGroupProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';
import { ChangeHandler } from 'react-hook-form';

import classes from './NaRhfCheckboxGroup.module.scss';

/**
 * @field label ラベル
 * @field value 値
 * @field disabled 無効
 * @see https://mantine.dev/core/checkbox/
 */
export type NaRhfCheckboxItemProps = {
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
export type NaRhfCheckboxGroupProps = Omit<ComponentPropsWithRef<'input'>, 'onChange'> &
  Omit<CheckboxGroupProps, 'children' | 'color' | 'onChange'> & {
    checkboxItems: NaRhfCheckboxItemProps[];
    color?: 'default' | 'info' | 'success' | 'warning' | 'danger';
    variant?: 'filled' | 'outline';
    inline?: boolean;
    disabled?: boolean;
    onChange: ChangeHandler;
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

/** NaRhfCheckboxGroup(共通UI) */
export const NaRhfCheckboxGroup: FC<NaRhfCheckboxGroupProps> = forwardRef(
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
      name,
      onChange,
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
        onChange={(value) => {
          onChange({ target: { name, value } });
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
