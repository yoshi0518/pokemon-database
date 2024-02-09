import { Fieldset, FieldsetProps } from '@mantine/core';

/**
 * @field variant 種類
 * @field legend 表題
 * @field disabled 無効
 * @see https://mantine.dev/core/fieldset/
 */
export type NaFieldsetProps = Omit<FieldsetProps, 'variant'> & {
  variant?: 'default' | 'filled' | 'unstyled';
};

/** NaFieldset(共通UI) */
export const NaFieldset = ({
  children,
  variant = 'filled',
  legend,
  className = '',
  ...otherProps
}: NaFieldsetProps) => (
  <div className={className}>
    <Fieldset {...otherProps} legend={<span className="px-1 font-semibold">{legend}</span>} variant={variant}>
      {children}
    </Fieldset>
  </div>
);
