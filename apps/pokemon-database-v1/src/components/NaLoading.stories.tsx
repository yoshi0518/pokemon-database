import { Meta, StoryObj } from '@storybook/react';

import { NaLoading } from './NaLoading';

import type { NaLoadingProps } from './NaLoading';

export default {
  title: 'Overlay/NaLoading',
  component: NaLoading,
  render: ({ ...otherProps }) => (
    <>
      <div className="relative mb-4">
        <h1>Section1</h1>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <NaLoading {...otherProps} />
      </div>

      <div className="relative">
        <h1>Section2</h1>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
        <div>text text text text text text text text text text</div>
      </div>
    </>
  ),
  argTypes: {
    visible: { description: '表示有無' },
    full: { description: '全画面表示有無' },
    type: {
      control: 'inline-radio',
      options: ['spinner', 'circle'],
      description: 'ローディングスタイル(spinner or circle)',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaLoading>;

type Story = StoryObj<typeof NaLoading>;

const defaultProps: NaLoadingProps = {
  visible: false,
  full: true,
  type: 'spinner',
};

export const FullSpinner: Story = {
  name: 'full + spinner',
  args: {
    ...defaultProps,
  },
};

export const FullCircle: Story = {
  name: 'full + circle',
  args: {
    ...defaultProps,
    type: 'circle',
  },
};

export const SectionSpinner: Story = {
  name: 'section + spinner',
  args: {
    ...defaultProps,
    full: false,
  },
};

export const SectionCircle: Story = {
  name: 'section + circle',
  args: {
    ...defaultProps,
    full: false,
    type: 'circle',
  },
};
