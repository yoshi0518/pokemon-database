import { Meta, StoryObj } from '@storybook/react';

import { NaBaseButton } from './NaBaseButton';
import { NaBaseInput } from './NaBaseInput';
import { NaFieldset } from './NaFieldset';

import type { NaFieldsetProps } from './NaFieldset';

export default {
  title: 'Input/NaFieldset',
  component: NaFieldset,
  render: ({ ...otherProps }) => <NaFieldset {...otherProps}></NaFieldset>,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'unstyled'],
      description: '種類',
    },
    legend: { description: '表題' },
    disabled: { description: '無効' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaFieldset>;

type Story = StoryObj<typeof NaFieldset>;

const defaultProps: NaFieldsetProps = {
  variant: 'default',
  legend: '表題',
  disabled: false,
  children: (
    <>
      <div>text text text text</div>
      <div>text text text text</div>
      <div>text text text text</div>
    </>
  ),
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

export const Children: Story = {
  name: 'children',
  args: {
    ...defaultProps,
    children: (
      <>
        <NaBaseInput label="item-1" description="description" />
        <NaBaseInput label="item-2" description="description" className="mt-2" />
        <NaBaseButton color="info" onClick={() => alert('alert')} className="mt-2">
          Button
        </NaBaseButton>
      </>
    ),
  },
};

export const Disabled: Story = {
  name: 'disabled',
  args: {
    ...defaultProps,
    disabled: true,
    children: (
      <>
        <NaBaseInput label="item-1" description="description" />
        <NaBaseInput label="item-2" description="description" className="mt-2" />
        <NaBaseButton color="info" onClick={() => alert('alert')} className="mt-2">
          Button
        </NaBaseButton>
      </>
    ),
  },
};
