import { Meta, StoryObj } from '@storybook/react';

import { NaBaseButton } from './NaBaseButton';
import { NaNotifications, addNotification } from './NaNotifications';

import type { NaNotificationsProps } from './NaNotifications';

export default {
  title: 'Feedback/NaNotifications',
  component: NaNotifications,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
      description: '通知の表示位置',
    },
    autoClose: { description: '自動で閉じる時間(ミリ秒)' },
    containerWidth: { description: '幅' },
    notificationMaxHeight: { description: '最大の高さ' },
    limit: { description: '表示される通知の最大数' },
    zIndex: { description: '通知領域のzIndex' },
    onClick: { description: 'クリック時イベント' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaNotifications>;

type Story = StoryObj<typeof NaNotifications>;

const defaultProps: NaNotificationsProps = {
  position: 'top-right',
  autoClose: 5000,
  containerWidth: 400,
  notificationMaxHeight: 250,
  limit: 5,
  zIndex: 1000,
  className: '',
};

export const MessageText: Story = {
  name: 'message / text',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        message: 'message message message',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const MessageArray: Story = {
  name: 'message / array',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        message: ['message1', 'message2', 'message3'],
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const Title: Story = {
  name: 'title',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const ColorInfo: Story = {
  name: 'color / info',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
        color: 'info',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const ColorSuccess: Story = {
  name: 'color / success',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
        color: 'success',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const ColorWarning: Story = {
  name: 'color / warning',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
        color: 'warning',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const ColorError: Story = {
  name: 'color / danger',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
        color: 'danger',
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};

export const Loading: Story = {
  name: 'loading',
  args: {
    ...defaultProps,
  },
  render: ({ ...otherProps }) => {
    const onClick = () => {
      addNotification({
        title: 'Title',
        message: 'message message message',
        color: 'info',
        loading: true,
      });
    };

    return (
      <>
        <main>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div>text text text text text</div>
          <div className="mt-2">
            <NaBaseButton color="info" onClick={onClick}>
              通知
            </NaBaseButton>
          </div>
        </main>
        <section>
          <NaNotifications {...otherProps} />
        </section>
      </>
    );
  },
};
