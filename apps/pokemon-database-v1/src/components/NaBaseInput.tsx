import { TextInput, TextInputProps } from '@mantine/core';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaBaseInput.module.scss';

/**
 * @field variant 種類
 * @field size サイズ
 * @field round 角丸
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field placeholder プレースホルダ
 * @field leftIcon 左アイコン
 * @field rightIcon 右アイコン
 * @field prependWord 接頭語
 * @field appendWard 接尾語
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/core/text-input/
 */
export type NaBaseInputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> &
  Omit<TextInputProps, 'variant' | 'size'> & {
    variant?: 'default' | 'filled' | 'unstyled';
    size?: 'default' | 'small' | 'large';
    round?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    prependWord?: string;
    appendWord?: string;
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

/** NaBaseInput(共通UI) */
export const NaBaseInput: FC<NaBaseInputProps> = forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      round = false,
      label = '',
      description = '',
      placeholder = '',
      error = '',
      leftIcon = '',
      rightIcon = '',
      prependWord = '',
      appendWord = '',
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div className={className}>
      <TextInput
        {...otherProps}
        variant={variant}
        size={getSize(size)}
        radius={round ? 'xl' : ''}
        label={label}
        description={description}
        placeholder={placeholder}
        error={error}
        leftSection={
          leftIcon ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-mr-0.5 h-5 w-5">
              <path fill="currentColor" d={leftIcon} />
            </svg>
          ) : prependWord ? (
            <span className="text-sm">{prependWord}</span>
          ) : undefined
        }
        rightSection={
          rightIcon ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-ml-0.5 h-5 w-5">
              <path fill="currentColor" d={rightIcon} />
            </svg>
          ) : appendWord ? (
            <span className="text-sm">{appendWord}</span>
          ) : undefined
        }
        classNames={{
          input: classes.input,
          error: classes.error,
        }}
        ref={ref}
      />
    </div>
  ),
);
