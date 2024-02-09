import { Meta, StoryObj } from '@storybook/react';

import { NaBaseMonthInput } from './NaBaseMonthInput';

import type { NaBaseMonthInputProps } from './NaBaseMonthInput';

export default {
  title: 'Date/NaBaseMonthInput',
  component: NaBaseMonthInput,
  render: ({ ...otherProps }) => <NaBaseMonthInput {...otherProps} />,
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
    dropdownType: {
      control: 'inline-radio',
      options: ['popover', 'modal'],
      description: 'カレンダー表示方法',
    },
    clearable: { description: '日付クリア' },
    valueFormat: { description: '日付表示書式' },
    monthsListFormat: { description: '月リスト表示書式' },
    yearLabelFormat: { description: '年表示書式' },
    minDate: { description: '選択可能な最小日付' },
    maxDate: { description: '選択可能な最大日付' },
    error: { description: 'エラー' },
    onChange: { description: '変更時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseMonthInput>;

type Story = StoryObj<typeof NaBaseMonthInput>;

const defaultProps: NaBaseMonthInputProps = {
  variant: 'default',
  size: 'default',
  round: false,
  withAsterisk: false,
  disabled: false,
  label: '',
  description: '',
  dropdownType: 'popover',
  clearable: true,
  valueFormat: 'YYYY/MM',
  monthsListFormat: 'M月',
  yearLabelFormat: 'YYYY年',
  minDate: undefined,
  maxDate: undefined,
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

export const DropdownTypePopover: Story = {
  name: 'dropdownType / popover',
  args: {
    ...defaultProps,
  },
};

export const DropdownTypeModal: Story = {
  name: 'dropdownType / modal',
  args: {
    ...defaultProps,
    dropdownType: 'modal',
  },
};

export const Clearable: Story = {
  name: 'clearable',
  args: {
    ...defaultProps,
    clearable: true,
  },
};

export const ValueFormat: Story = {
  name: 'valueFormat',
  args: {
    ...defaultProps,
    valueFormat: 'YYYY/MM',
  },
};

export const MonthsListFormat: Story = {
  name: 'monthsListFormat',
  args: {
    ...defaultProps,
    monthsListFormat: 'M月',
  },
};

export const YearLabelFormat: Story = {
  name: 'yearLabelFormat',
  args: {
    ...defaultProps,
    yearLabelFormat: 'YYYY年',
  },
};

export const MinMaxDate: Story = {
  name: 'minDate / maxDate',
  args: {
    ...defaultProps,
    minDate: new Date(),
    maxDate: new Date(),
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
