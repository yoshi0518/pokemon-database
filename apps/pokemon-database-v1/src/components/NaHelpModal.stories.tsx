import { Meta, StoryObj } from '@storybook/react';

import { NaHelpModal } from './NaHelpModal';

import type { NaHelpModalProps } from './NaHelpModal';

export default {
  title: 'Overlay/NaHelpModal',
  component: NaHelpModal,
  render: ({ children, ...otherProps }) => <NaHelpModal {...otherProps}>{children}</NaHelpModal>,
  argTypes: {
    children: { description: 'メインコンテンツ' },
    title: { description: 'タイトル' },
    visible: { description: '表示有無' },
    onClickClose: { description: '閉じるボタンクリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaHelpModal>;

type Story = StoryObj<typeof NaHelpModal>;

const defaultProps: NaHelpModalProps = {
  children: (
    <>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
    </>
  ),
  title: 'Title',
  visible: false,
  onClickClose: () => console.log('onClickClose'),
};

export const DefaultStory: Story = {
  name: 'default',
  args: {
    ...defaultProps,
  },
};
