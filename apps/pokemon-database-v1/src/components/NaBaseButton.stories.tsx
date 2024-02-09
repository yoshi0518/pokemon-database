import { Meta, StoryObj } from '@storybook/react';

import { NaBaseButton } from './NaBaseButton';

import type { NaBaseButtonProps } from './NaBaseButton';

export default {
  title: 'Button/NaBaseButton',
  component: NaBaseButton,
  render: ({ children, ...otherProps }) => <NaBaseButton {...otherProps}>{children}</NaBaseButton>,
  argTypes: {
    children: { description: 'ラベル' },
    color: {
      control: 'inline-radio',
      options: ['default', 'info', 'success', 'warning', 'danger'],
      description: 'カラー',
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'light', 'outline', 'subtle', 'transparent', 'white'],
      description: '種類',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small', 'large'],
      description: 'サイズ',
    },
    block: { description: '全幅' },
    round: { description: '角丸' },
    loading: { description: 'ローディング' },
    loadingIcon: {
      control: 'inline-radio',
      options: ['oval', 'dots', 'bars'],
      description: 'ローディングアイコン',
    },
    disabled: { description: '無効' },
    leftIcon: { description: '左アイコン' },
    rightIcon: { description: '右アイコン' },
    centerIcon: { description: '中央アイコン' },
    onClick: { description: 'クリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseButton>;

type Story = StoryObj<typeof NaBaseButton>;

const defaultProps: NaBaseButtonProps = {
  children: 'label',
  color: 'default',
  variant: 'filled',
  size: 'default',
  block: false,
  round: false,
  loading: false,
  loadingIcon: 'oval',
  disabled: false,
  leftIcon: '',
  rightIcon: '',
  centerIcon: '',
  onClick: () => console.log('onClick'),
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

export const VariantDefault: Story = {
  name: 'variant / default',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'default',
  },
};

export const VariantFilled: Story = {
  name: 'variant / filled',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'filled',
  },
};

export const VariantLight: Story = {
  name: 'variant / light',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'light',
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

export const VariantSubtle: Story = {
  name: 'variant / subtle',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'subtle',
  },
};

export const VariantTransparent: Story = {
  name: 'variant / transparent',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'transparent',
  },
};

export const VariantWhite: Story = {
  name: 'variant / white',
  args: {
    ...defaultProps,
    color: 'info',
    variant: 'white',
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

export const Block: Story = {
  name: 'block',
  args: {
    ...defaultProps,
    block: true,
  },
};

export const Round: Story = {
  name: 'round',
  args: {
    ...defaultProps,
    round: true,
  },
};

export const Disabled: Story = {
  name: 'disabled',
  args: {
    ...defaultProps,
    disabled: true,
  },
};

export const LoadingOval: Story = {
  name: 'loading / oval',
  args: {
    ...defaultProps,
    loading: true,
  },
};

export const LoadingDots: Story = {
  name: 'loading / dots',
  args: {
    ...defaultProps,
    loading: true,
    loadingIcon: 'dots',
  },
};

export const LoadingBars: Story = {
  name: 'loading / bars',
  args: {
    ...defaultProps,
    loading: true,
    loadingIcon: 'bars',
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
    color: 'success',
    rightIcon:
      'M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M12.9 14.5L15.8 19H14L12 15.6L10 19H8.2L11.1 14.5L8.2 10H10L12 13.4L14 10H15.8L12.9 14.5Z',
  },
};

export const IconOnly: Story = {
  name: 'icon / only',
  args: {
    ...defaultProps,
    color: 'warning',
    children: '',
    centerIcon:
      'M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M12.9 14.5L15.8 19H14L12 15.6L10 19H8.2L11.1 14.5L8.2 10H10L12 13.4L14 10H15.8L12.9 14.5Z',
  },
};
