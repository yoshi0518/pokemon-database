import { Radio, RadioGroupProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';
import { ChangeHandler } from 'react-hook-form';

import classes from './NaRhfRadioGroup.module.scss';

/**
 * @field label ラベル
 * @field value 値
 * @field disabled 無効
 * @see https://mantine.dev/core/radio/
 */
export type NaRhfRadioItemProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

/**
 * @field value 選択中の要素
 * @fielc radioItems ラジオボタンリスト
 * @field color カラー
 * @field variant 種類
 * @field inline 並び方向
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/core/radio/
 */
export type NaRhfRadioGroupProps = Omit<ComponentPropsWithRef<'input'>, 'onChange'> &
  Omit<RadioGroupProps, 'children' | 'color' | 'onChange'> & {
    radioItems: NaRhfRadioItemProps[];
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

/** NaRhfRadioGroup(共通UI) */
export const NaRhfRadioGroup: FC<NaRhfRadioGroupProps> = forwardRef(
  (
    {
      value,
      radioItems,
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
      <Radio.Group
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
        {radioItems.map((item) => (
          <div
            key={item.value}
            className={clsx('mt-2', {
              'block': !inline,
              'inline-block': inline,
              'mr-2': inline,
            })}
          >
            <Radio
              label={item.label}
              value={item.value}
              color={getColor(color)}
              variant={variant}
              disabled={disabled || item.disabled}
            />
          </div>
        ))}
      </Radio.Group>
    </div>
  ),
);
