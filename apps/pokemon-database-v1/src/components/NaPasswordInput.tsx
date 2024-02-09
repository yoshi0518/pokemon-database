import { PasswordInput, PasswordInputProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaPasswordInput.module.scss';

/**
 * @field variant 種類
 * @field size サイズ
 * @field round 角丸
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field placeholder プレースホルダ
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/core/password-input/
 */
export type NaPasswordInputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> &
  Omit<PasswordInputProps, 'variant' | 'size'> & {
    variant?: 'default' | 'filled' | 'unstyled';
    size?: 'default' | 'small' | 'large';
    round?: boolean;
  };

const getSize = (size: string) => {
  switch (size) {
    case 'default':
      return 'sm';
    case 'small':
      return 'xs';
    case 'large':
      return 'md';
    default:
      return 'sm';
  }
};

/** NaPasswordInput(共通UI) */
export const NaPasswordInput: FC<NaPasswordInputProps> = forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      round = false,
      label = '',
      description = '',
      placeholder = '',
      error = '',
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div className={className}>
      <PasswordInput
        {...otherProps}
        variant={variant}
        size={getSize(size)}
        radius={round ? 'xl' : ''}
        label={label}
        description={description}
        placeholder={placeholder}
        visibilityToggleIcon={({ reveal }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={clsx('h-5 w-5', { 'text-rose-500': error })}
          >
            <path
              fill="currentColor"
              d={
                reveal
                  ? 'M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17S8 16.11 8 15 8.9 13 10 13M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3S21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M16 10V20H4V10H16Z'
                  : 'M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z'
              }
            />
          </svg>
        )}
        error={error}
        classNames={{
          input: classes.input,
          error: classes.error,
        }}
        ref={ref}
      />
    </div>
  ),
);
