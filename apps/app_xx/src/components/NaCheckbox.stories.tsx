import { Meta, StoryObj } from '@storybook/react';

import { NaCheckbox } from './NaCheckbox';

import type { NaCheckboxProps } from './NaCheckbox';

export default {
  title: 'Input/NaCheckbox',
  component: NaCheckbox,
  render: ({ ...otherProps }) => <NaCheckbox {...otherProps} />,
  argTypes: {
    label: { description: 'ラベル' },
    checked: { description: 'チェック有無' },
    color: {
      control: 'inline-radio',
      options: ['default', 'info', 'success', 'warning', 'danger'],
      description: 'カラー',
    },
    variant: {
      control: 'inline-radio',
      options: ['filled', 'outline'],
      description: '種類',
    },
    disabled: { description: '無効' },
    description: { description: '説明' },
    error: { description: 'エラー' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaCheckbox>;

type Story = StoryObj<typeof NaCheckbox>;

const defaultProps: NaCheckboxProps = {
  label: 'label',
  checked: true,
  color: 'default',
  variant: 'filled',
  disabled: false,
  description: '',
  error: '',
};

export const ColorDefault: Story = {
  name: 'color / default',
  args: {
    ...defaultProps,
  },
};

export const ColorInfo: Story = {
  name: 'color / info',
  args: {
    ...defaultProps,
    color: 'info',
  },
};

export const ColorSuccess: Story = {
  name: 'color / success',
  args: {
    ...defaultProps,
    color: 'success',
  },
};

export const ColorWarning: Story = {
  name: 'color / warning',
  args: {
    ...defaultProps,
    color: 'warning',
  },
};

export const ColorDanger: Story = {
  name: 'color / danger',
  args: {
    ...defaultProps,
    color: 'danger',
  },
};

export const VariantFilled: Story = {
  name: 'variant / filled',
  args: {
    ...defaultProps,
    color: 'info',
  },
};

export const VariantOutline: Story = {
  name: 'variant / outline',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'outline',
  },
};

export const Disabled: Story = {
  name: 'disabled',
  args: {
    ...defaultProps,
    disabled: true,
  },
};

export const Description: Story = {
  name: 'description',
  args: {
    ...defaultProps,
    description: 'description description',
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
