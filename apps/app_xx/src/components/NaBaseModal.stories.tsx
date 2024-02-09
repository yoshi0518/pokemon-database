import { Meta, StoryObj } from '@storybook/react';

import { NaBaseModal } from './NaBaseModal';

import type { NaBaseModalProps } from './NaBaseModal';

export default {
  title: 'Overlay/NaBaseModal',
  component: NaBaseModal,
  render: ({ children, ...otherProps }) => <NaBaseModal {...otherProps}>{children}</NaBaseModal>,
  argTypes: {
    children: { description: 'メインコンテンツ' },
    title: { description: 'タイトル' },
    visible: { description: '表示有無' },
    icon: { description: 'アイコン' },
    okLabel: { description: 'Okボタンラベル' },
    cancelLabel: { description: 'Cancelボタンラベル' },
    onClickOk: { description: 'Okボタンクリック時イベント' },
    onClickCancel: { description: 'Cancelボタンクリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaBaseModal>;

type Story = StoryObj<typeof NaBaseModal>;

const defaultProps: NaBaseModalProps = {
  children: (
    <>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
    </>
  ),
  title: 'Title',
  visible: false,
  icon: 'M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z',
  okLabel: 'Ok',
  cancelLabel: 'Cancel',
  onClickOk: () => console.log('onClickOk'),
  onClickCancel: () => console.log('onClickCancel'),
};

export const DefaultStory: Story = {
  name: 'default',
  args: {
    ...defaultProps,
  },
};

export const IconStory: Story = {
  name: 'icon',
  args: {
    ...defaultProps,
    icon: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  },
};
