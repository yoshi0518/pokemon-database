import { Meta, StoryObj } from '@storybook/react';

import { NaDialog } from './NaDialog';

import type { NaDialogProps } from './NaDialog';

export default {
  title: 'Overlay/NaDialog',
  component: NaDialog,
  render: ({ ...otherProps }) => <NaDialog {...otherProps} />,
  argTypes: {
    title: { description: 'タイトル' },
    message: { description: 'メッセージ' },
    visible: { description: '表示有無' },
    color: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'danger', 'question'],
      description: 'カラー',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small', 'large'],
      description: 'サイズ',
    },
    okLabel: { description: 'Okボタンラベル' },
    cancelLabel: { description: 'Cancelボタンラベル。文字が指定されたらCancelボタンを表示' },
    onClickOk: { description: 'Okボタンクリック時イベント' },
    onClickCancel: { description: 'Cancelボタンクリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaDialog>;

type Story = StoryObj<typeof NaDialog>;

const defaultProps: NaDialogProps = {
  title: 'Title',
  message: 'message message message',
  visible: false,
  color: 'info',
  size: 'default',
  okLabel: 'Ok',
  cancelLabel: '',
  onClickOk: () => console.log('onClickOk'),
  onClickCancel: () => console.log('onClickCancel'),
};

export const MessageText: Story = {
  name: 'message / text',
  args: {
    ...defaultProps,
  },
};

export const MessageArray: Story = {
  name: 'message / array',
  args: {
    ...defaultProps,
    message: ['message1', 'message2', 'message3'],
  },
};

export const ColorInfo: Story = {
  name: 'color / info',
  args: {
    ...defaultProps,
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

export const ColorQuestion: Story = {
  name: 'color / question',
  args: {
    ...defaultProps,
    color: 'question',
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

export const ButtonOk: Story = {
  name: 'button / ok',
  args: {
    ...defaultProps,
  },
};

export const ButtonCancel: Story = {
  name: 'button / cancel',
  args: {
    ...defaultProps,
    cancelLabel: 'Cancel',
  },
};
