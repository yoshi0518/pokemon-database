import { Meta, StoryObj } from '@storybook/react';

import { NaBaseInput } from './NaBaseInput';

import type { NaBaseInputProps } from './NaBaseInput';

export default {
  title: 'Input/NaBaseInput',
  component: NaBaseInput,
  render: ({ ...otherProps }) => <NaBaseInput {...otherProps} />,
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
    leftIcon: { description: '左アイコン' },
    rightIcon: { description: '右アイコン' },
    prependWord: { description: '接頭語' },
    appendWord: { description: '接尾語' },
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseInput>;

type Story = StoryObj<typeof NaBaseInput>;

const defaultProps: NaBaseInputProps = {
  variant: 'default',
  size: 'default',
  round: false,
  withAsterisk: false,
  disabled: false,
  label: '',
  description: '',
  placeholder: '',
  leftIcon: '',
  rightIcon: '',
  prependWord: '',
  appendWord: '',
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

export const IconLeft: Story = {
  name: 'icon / left',
  args: {
    ...defaultProps,
    leftIcon:
      'M10,2V4.26L12,5.59V4H22V19H17V21H24V2H10M7.5,5L0,10V21H15V10L7.5,5M14,6V6.93L15.61,8H16V6H14M18,6V8H20V6H18M7.5,7.5L13,11V19H10V13H5V19H2V11L7.5,7.5M18,10V12H20V10H18M18,14V16H20V14H18Z',
  },
};

export const IconRight: Story = {
  name: 'icon / right',
  args: {
    ...defaultProps,
    rightIcon:
      'M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M12.9 14.5L15.8 19H14L12 15.6L10 19H8.2L11.1 14.5L8.2 10H10L12 13.4L14 10H15.8L12.9 14.5Z',
  },
};

export const PrependWord: Story = {
  name: 'prependWord',
  args: {
    ...defaultProps,
    prependWord: '$',
  },
};

export const AppendWord: Story = {
  name: 'appendWord',
  args: {
    ...defaultProps,
    appendWord: '階',
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
