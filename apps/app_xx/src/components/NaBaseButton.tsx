import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, FC, MouseEventHandler } from 'react';

import classes from './NaBaseButton.module.scss';

/**
 * @field color カラー
 * @field variant 種類
 * @field size サイズ
 * @field block 全幅
 * @field round 角丸
 * @field disabled 無効
 * @field loading ローディング
 * @field loadingIcon ローディングアイコン
 * @field leftIcon 左アイコン
 * @field rightIcon 右アイコン
 * @field centerIcon 中央アイコン
 * @field onClick クリック時イベント
 * @see https://mantine.dev/core/button/
 */
export type NaBaseButtonProps = ComponentPropsWithRef<'button'> &
  Omit<ButtonProps, 'color' | 'variant' | 'size' | 'fullWidth'> & {
    color?: 'default' | 'info' | 'success' | 'warning' | 'danger';
    variant?: 'default' | 'filled' | 'light' | 'outline' | 'subtle' | 'transparent' | 'white';
    size?: 'default' | 'small' | 'large';
    block?: boolean;
    round?: boolean;
    loadingIcon?: 'oval' | 'dots' | 'bars';
    leftIcon?: string;
    rightIcon?: string;
    centerIcon?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
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

/** NaBaseButton(共通UI) */
export const NaBaseButton: FC<NaBaseButtonProps> = forwardRef(
  (
    {
      children,
      color = 'default',
      variant = 'filled',
      size = 'default',
      block = false,
      round = false,
      loading = false,
      loadingIcon = 'oval',
      leftIcon = '',
      rightIcon = '',
      centerIcon = '',
      onClick,
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div
      className={clsx(
        {
          'inline-block': !block,
          'block': block,
        },
        className,
      )}
    >
      <Button
        {...otherProps}
        color={getColor(color)}
        variant={variant}
        size={getSize(size)}
        fullWidth={block}
        radius={round ? 'xl' : 'sm'}
        loading={loading}
        loaderProps={
          loadingIcon && {
            type: loadingIcon,
          }
        }
        leftSection={
          leftIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-mr-0.5 h-5 w-5">
              <path fill="currentColor" d={leftIcon} />
            </svg>
          )
        }
        rightSection={
          rightIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-ml-0.5 h-5 w-5">
              <path fill="currentColor" d={rightIcon} />
            </svg>
          )
        }
        onClick={onClick}
        classNames={{
          root: classes.root,
        }}
        px={centerIcon ? 'xs' : 'sm'} // アイコンのみ(centerIconあり)の場合はpaddingを減らす
        ref={ref}
      >
        {centerIcon ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="currentColor" d={centerIcon} />
          </svg>
        ) : (
          children
        )}
      </Button>
    </div>
  ),
);
