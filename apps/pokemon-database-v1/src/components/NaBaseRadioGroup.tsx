import { Radio, RadioGroupProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaBaseRadioGroup.module.scss';

/**
 * @field label ラベル
 * @field value 値
 * @field disabled 無効
 * @see https://mantine.dev/core/radio/
 */
export type NaBaseRadioItemProps = {
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
export type NaBaseRadioGroupProps = ComponentPropsWithRef<'input'> &
  Omit<RadioGroupProps, 'children' | 'color'> & {
    radioItems: NaBaseRadioItemProps[];
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

/** NaBaseRadioGroup(共通UI) */
export const NaBaseRadioGroup: FC<NaBaseRadioGroupProps> = forwardRef(
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
