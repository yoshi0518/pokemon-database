import { Meta, StoryObj } from '@storybook/react';

import { NaPagination } from './NaPagination';

import type { NaPaginationProps } from './NaPagination';

export default {
  title: 'Navigation/NaPagination',
  component: NaPagination,
  render: ({ ...otherProps }) => <NaPagination {...otherProps} />,
  argTypes: {
    currentPage: { description: '現在ページ数' },
    maxPage: { description: '最大ページ数' },
    displayCount: { description: '現在ページ前後に表示する数' },
    loading: { description: '読み込み中' },
    onClickMove: { description: 'Moveボタンクリック時イベント' },
    onClickNext: { description: 'Nextボタンクリック時イベント' },
    onClickPrev: { description: 'Prevボタンクリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaPagination>;

type Story = StoryObj<typeof NaPagination>;

const defaultProps: NaPaginationProps = {
  currentPage: 1,
  maxPage: 50,
  displayCount: 2,
  loading: false,
  onClickMove: (page) => console.log('move', page),
  onClickNext: () => console.log('next'),
  onClickPrev: () => console.log('prev'),
};

export const Pagination1: Story = {
  name: 'currentPage: 1 / maxPage: 50 / displayCount: 2',
  args: {
    ...defaultProps,
  },
};

export const Pagination2: Story = {
  name: 'currentPage: 8 / maxPage: 50 / displayCount: 2',
  args: {
    ...defaultProps,
    currentPage: 8,
  },
};

export const Pagination3: Story = {
  name: 'currentPage: 48 / maxPage: 50 / displayCount: 2',
  args: {
    ...defaultProps,
    currentPage: 48,
  },
};

export const Pagination4: Story = {
  name: 'currentPage: 10 / maxPage: 50 / displayCount: 5',
  args: {
    ...defaultProps,
    currentPage: 10,
    displayCount: 5,
  },
};
