import { Meta, StoryObj } from '@storybook/react';

import { NaTextarea } from './NaTextarea';

import type { NaTextareaProps } from './NaTextarea';

export default {
  title: 'Input/NaTextarea',
  component: NaTextarea,
  render: ({ ...otherProps }) => <NaTextarea {...otherProps} />,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'unstyled'],
      description: '種類',
    },
    autosize: { description: 'サイズ自動変更' },
    minRows: { description: '最小行数' },
    maxRows: { description: '最大行数' },
    withAsterisk: { description: '必須' },
    disabled: { description: '無効' },
    label: { description: 'ラベル' },
    description: { description: '説明' },
    placeholder: { description: 'プレースホルダ' },
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaTextarea>;

type Story = StoryObj<typeof NaTextarea>;

const defaultProps: NaTextareaProps = {
  variant: 'default',
  autosize: true,
  minRows: undefined,
  maxRows: undefined,
  withAsterisk: false,
  disabled: false,
  label: '',
  description: '',
  placeholder: '',
  error: '',
  onChange: () => console.log('onChange'),
};

export const VariantDefault: Story = {
  name: 'variant / default',
  args: {
    ...defaultProps,
  },
};

export const VariantFilled: Story = {
  name: 'variant / filled',
  args: {
    ...defaultProps,
    variant: 'filled',
  },
};

export const VariantUnstyled: Story = {
  name: 'variant / unstyled',
  args: {
    ...defaultProps,
    variant: 'unstyled',
  },
};

export const MinMaxAutoRows: Story = {
  name: 'autosize',
  args: {
    ...defaultProps,
    autosize: true,
  },
};

export const MinMaxRows: Story = {
  name: 'minSize / maxSize',
  args: {
    ...defaultProps,
    autosize: true,
    minRows: 2,
    maxRows: 5,
  },
};

export const WithAsterisk: Story = {
  name: 'withAsterisk',
  args: {
    ...defaultProps,
    label: 'label',
    withAsterisk: true,
  },
};

export const LabelDescriptionPlaceholder: Story = {
  name: 'label / description / placeholder',
  args: {
    ...defaultProps,
    label: 'label',
    description: 'description description',
    placeholder: 'placeholder placeholder',
  },
};

export const Error: Story = {
  name: 'error',
  args: {
    ...defaultProps,
    label: 'label',
    error: 'error error',
  },
};
