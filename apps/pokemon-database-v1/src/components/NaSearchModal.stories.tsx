import { Meta, StoryObj } from '@storybook/react';

import { NaSearchModal } from './NaSearchModal';

import type { NaSearchModalProps } from './NaSearchModal';

export default {
  title: 'Overlay/NaSearchModal',
  component: NaSearchModal,
  render: ({ children, ...otherProps }) => <NaSearchModal {...otherProps}>{children}</NaSearchModal>,
  argTypes: {
    children: { description: 'メインコンテンツ' },
    onClickSearch: { description: '検索ボタンクリック時イベント' },
    onClickClear: { description: '解除ボタンクリック時イベント' },
    onClickClose: { description: '閉じるボタンクリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaSearchModal>;

type Story = StoryObj<typeof NaSearchModal>;

const defaultProps: NaSearchModalProps = {
  children: (
    <>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
      <p className="m-0">text text text text text</p>
    </>
  ),
  visible: false,
  onClickSearch: () => console.log('onClickSearch'),
  onClickClear: () => console.log('onClickClear'),
  onClickClose: () => console.log('onClickClose'),
};

export const DefaultStory: Story = {
  name: 'default',
  args: {
    ...defaultProps,
  },
};
