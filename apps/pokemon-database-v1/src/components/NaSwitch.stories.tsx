import { Meta, StoryObj } from '@storybook/react';

import { NaSwitch } from './NaSwitch';

import type { NaSwitchProps } from './NaSwitch';

export default {
  title: 'Input/NaSwitch',
  component: NaSwitch,
  render: ({ ...otherProps }) => <NaSwitch {...otherProps} />,
  argTypes: {
    label: { description: 'ラベル' },
    checked: { description: 'チェック有無' },
    color: {
      control: 'inline-radio',
      options: ['default', 'info', 'success', 'warning', 'danger'],
      description: 'カラー',
    },
    disabled: { description: '無効' },
    description: { description: '説明' },
    offLabel: { description: 'オフ時のラベル' },
    onLabel: { description: 'オン時のラベル' },
    error: { description: 'エラー' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaSwitch>;

type Story = StoryObj<typeof NaSwitch>;

const defaultProps: NaSwitchProps = {
  label: 'label',
  checked: true,
  color: 'default',
  disabled: false,
  description: '',
  offLabel: '',
  onLabel: '',
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

export const OnLabelOffLabel: Story = {
  name: 'onlabel / offlabel',
  args: {
    ...defaultProps,
    onLabel: 'on',
    offLabel: 'off',
  },
};
