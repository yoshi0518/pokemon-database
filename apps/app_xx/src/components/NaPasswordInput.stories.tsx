import { Meta, StoryObj } from '@storybook/react';

import { NaPasswordInput } from './NaPasswordInput';

import type { NaPasswordInputProps } from './NaPasswordInput';

export default {
  title: 'Input/NaPasswordInput',
  component: NaPasswordInput,
  render: ({ ...otherProps }) => <NaPasswordInput {...otherProps} />,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'unstyled'],
      description: '種類',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small', 'large'],
      description: 'サイズ',
    },
    round: { description: '角丸' },
    withAsterisk: { description: '必須' },
    disabled: { description: '無効' },
    label: { description: 'ラベル' },
    description: { description: '説明' },
    placeholder: { description: 'プレースホルダ' },
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaPasswordInput>;

type Story = StoryObj<typeof NaPasswordInput>;

const defaultProps: NaPasswordInputProps = {
  variant: 'default',
  size: 'default',
  round: false,
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

export const SizeDefault: Story = {
  name: 'size / default',
  args: {
    ...defaultProps,
  },
};

export const SizeSmall: Story = {
  name: 'size / small',
  args: {
    ...defaultProps,
    size: 'small',
  },
};

export const SizeLarge: Story = {
  name: 'size / large',
  args: {
    ...defaultProps,
    size: 'large',
  },
};

export const Round: Story = {
  name: 'round',
  args: {
    ...defaultProps,
    round: true,
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

export const Disabled: Story = {
  name: 'disabled',
  args: {
    ...defaultProps,
    disabled: true,
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
