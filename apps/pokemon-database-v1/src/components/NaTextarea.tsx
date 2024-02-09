import { Textarea, TextareaProps } from '@mantine/core';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaTextarea.module.scss';

/**
 * @field variant 種類
 * @field autosize サイズ自動変更
 * @field minRows 最小行数
 * @field maxRows 最大行数
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field placeholder プレースホルダ
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/core/textarea/
 */
export type NaTextareaProps = ComponentPropsWithRef<'textarea'> &
  Omit<TextareaProps, 'variant'> & {
    variant?: 'default' | 'filled' | 'unstyled';
  };

/** NaTextarea(共通UI) */
export const NaTextarea: FC<NaTextareaProps> = forwardRef(
  (
    {
      variant = 'default',
      autosize = true,
      minRows = 3,
      maxRows = 10,
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
      <Textarea
        {...otherProps}
        variant={variant}
        autosize={autosize}
        minRows={minRows}
        maxRows={maxRows}
        label={label}
        description={description}
        placeholder={placeholder}
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
