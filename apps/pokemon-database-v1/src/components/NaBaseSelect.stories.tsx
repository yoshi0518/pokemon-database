import { Meta, StoryObj } from '@storybook/react';

import { NaBaseSelect } from './NaBaseSelect';

import type { NaBaseSelectItemProps, NaBaseSelectProps } from './NaBaseSelect';

export default {
  title: 'Input/NaBaseSelect',
  component: NaBaseSelect,
  render: ({ ...otherProps }) => <NaBaseSelect {...otherProps} />,
  argTypes: {
    variant: {
      value: { description: '選択中の要素' },
      selectItems: { description: '要素リスト' },
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
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseSelect>;

type Story = StoryObj<typeof NaBaseSelect>;

const defaultSelectItems: NaBaseSelectItemProps[] = [
  { label: 'label-1', value: 'item-1' },
  { label: 'label-2', value: 'item-2' },
  { label: 'label-3', value: 'item-3' },
  { label: 'label-4', value: 'item-4' },
  { label: 'label-5', value: 'item-5', disabled: true },
];

const defaultProps: NaBaseSelectProps = {
  value: 'item-3',
  selectItems: defaultSelectItems,
  variant: 'default',
  size: 'default',
  round: false,
  withAsterisk: false,
  disabled: false,
  label: '',
  description: '',
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
