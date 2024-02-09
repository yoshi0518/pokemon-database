import { Switch, SwitchProps } from '@mantine/core';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaSwitch.module.scss';
/**
 * @field label ラベル
 * @field checked チェック有無
 * @field color カラー
 * @field disabled 無効
 * @field description 説明
 * @field offLabel オフ時のラベル
 * @field onLabel オン時のラベル
 * @field error エラー
 * @see https://mantine.dev/core/switch/
 */
export type NaSwitchProps = ComponentPropsWithRef<'input'> &
  Omit<SwitchProps, 'color'> & {
    color?: 'default' | 'info' | 'success' | 'warning' | 'danger';
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

/** NaSwitch(共通UI) */
export const NaSwitch: FC<NaSwitchProps> = forwardRef(
  (
    {
      label,
      color = 'default',
      description = '',
      offLabel = '',
      onLabel = '',
      error = '',
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div className={className}>
      <Switch
        {...otherProps}
        label={label}
        color={getColor(color)}
        description={description}
        offLabel={offLabel}
        onLabel={onLabel}
        error={error}
        classNames={{
          track: classes.track,
          error: classes.error,
        }}
        ref={ref}
      />
    </div>
  ),
);
