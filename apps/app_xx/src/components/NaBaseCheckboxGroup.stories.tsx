import { Meta, StoryObj } from '@storybook/react';

import { NaBaseCheckboxGroup } from './NaBaseCheckboxGroup';

import type { NaBaseCheckboxGroupProps, NaBaseCheckboxItemProps } from './NaBaseCheckboxGroup';

export default {
  title: 'Input/NaBaseCheckboxGroup',
  component: NaBaseCheckboxGroup,
  render: ({ ...otherProps }) => <NaBaseCheckboxGroup {...otherProps} />,
  argTypes: {
    value: { description: 'チェック中の値リスト' },
    checkboxItems: { description: 'チェックボックスリスト' },
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
    withAsterisk: { description: '必須' },
    inline: { description: '並び方向' },
    disabled: { description: '無効' },
    label: { description: 'ラベル' },
    description: { description: '説明' },
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseCheckboxGroup>;

type Story = StoryObj<typeof NaBaseCheckboxGroup>;

const defaultCheckboxItems: NaBaseCheckboxItemProps[] = [
  { label: 'label-1', value: 'item-1' },
  { label: 'label-2', value: 'item-2' },
  { label: 'label-3', value: 'item-3' },
  { label: 'label-4', value: 'item-4' },
  { label: 'label-5', value: 'item-5', disabled: true },
];

const defaultProps: NaBaseCheckboxGroupProps = {
  value: ['item-2', 'item-3', 'item-5'],
  checkboxItems: defaultCheckboxItems,
  color: 'default',
  variant: 'filled',
  withAsterisk: false,
  inline: false,
  disabled: false,
  label: '',
  description: '',
  error: '',
  onChange: () => console.log('onChange'),
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

export const Inline: Story = {
  name: 'inline',
  args: {
    ...defaultProps,
    color: 'info',
    inline: true,
  },
};

export const Disabled: Story = {
  name: 'disabled',
  args: {
    ...defaultProps,
    disabled: true,
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

export const LabelDescription: Story = {
  name: 'label / description',
  args: {
    ...defaultProps,
    label: 'label',
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
