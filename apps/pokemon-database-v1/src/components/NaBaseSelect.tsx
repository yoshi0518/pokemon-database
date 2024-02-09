import { NativeSelect, NativeSelectProps } from '@mantine/core';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';

import classes from './NaBaseSelect.module.scss';

/**
 * @field label ラベル
 * @field value 値
 * @field disabled 無効
 * @see https://mantine.dev/core/native-select/
 */
export type NaBaseSelectItemProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

/**
 * @field value 選択中の要素
 * @fielc selectItems 要素リスト
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
 * @see https://mantine.dev/core/native-select/
 */
export type NaBaseSelectProps = Omit<ComponentPropsWithRef<'select'>, 'size'> &
  Omit<NativeSelectProps, 'variant' | 'size'> & {
    selectItems: NaBaseSelectItemProps[];
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

/** NaBaseSelect(共通UI) */
export const NaBaseSelect: FC<NaBaseSelectProps> = forwardRef(
  (
    {
      value,
      selectItems,
      variant = 'default',
      size = 'default',
      round = false,
      label = '',
      description = '',
      error = '',
      className = '',
      ...otherProps
    },
    ref,
  ) => (
    <div className={className}>
      <NativeSelect
        {...otherProps}
        value={value}
        data={selectItems}
        variant={variant}
        size={getSize(size)}
        radius={round ? 'xl' : ''}
        label={label}
        description={description}
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
