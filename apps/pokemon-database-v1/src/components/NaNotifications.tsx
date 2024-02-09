import { Notifications, NotificationsProps, showNotification, NotificationData } from '@mantine/notifications';

/**
 * @field position 通知の表示位置
 * @field autoClose 自動で閉じる時間(ミリ秒)
 * @field containerWidth 幅
 * @field notificationMaxHeight 最大の高さ
 * @field limit 表示される通知の最大数
 * @field transitionDuration 表示・非表示にかける時間(ミリ秒)
 * @field zIndex 通知領域のzindex
 * @see https://mantine.dev/others/notifications/
 */
export type NaNotificationsProps = NotificationsProps;

/** NaNotification(共通UI) */
export const NaNotifications = ({
  position = 'top-right',
  autoClose = 5000,
  containerWidth = 400,
  notificationMaxHeight = 250,
  limit = 5,
  transitionDuration = 500,
  zIndex = 1000,
  className = '',
}: NaNotificationsProps) => (
  <div className={className}>
    <Notifications
      position={position}
      autoClose={autoClose}
      containerWidth={containerWidth}
      notificationMaxHeight={notificationMaxHeight}
      limit={limit}
      transitionDuration={transitionDuration}
      zIndex={zIndex}
    />
  </div>
);

/**
 * @field id 通知ID
 * @field title タイトル
 * @field message メッセージ
 * @field color カラー
 * @field icon アイコン
 * @field loading ローディング
 * @field withBorder 枠線有無
 * @field withCloseButton 閉じるボタン有無
 * @field autoClose 自動で閉じる時間(ミリ秒)
 * @field onOpen 通知オープン時イベント
 * @field onClose 通知クローズ時イベント
 * @see https://mantine.dev/core/notification/
 */
export type addNotificationProps = Omit<NotificationData, 'title' | 'message' | 'color'> & {
  title?: string;
  message: string | string[];
  color?: 'info' | 'success' | 'warning' | 'danger';
};

const getColor = (color: string) => {
  switch (color) {
    case 'info':
      return 'blue';
    case 'success':
      return 'emerald';
    case 'warning':
      return 'yellow';
    case 'danger':
      return 'rose';
    default:
      return 'gray';
  }
};

const getIcon = (color: string) => {
  switch (color) {
    case 'info':
      return 'M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z';
    case 'success':
      return 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z';
    case 'warning':
      return 'M23,12L20.56,14.78L20.9,18.46L17.29,19.28L15.4,22.46L12,21L8.6,22.47L6.71,19.29L3.1,18.47L3.44,14.78L1,12L3.44,9.21L3.1,5.53L6.71,4.72L8.6,1.54L12,3L15.4,1.54L17.29,4.72L20.9,5.54L20.56,9.22L23,12M20.33,12L18.5,9.89L18.74,7.1L16,6.5L14.58,4.07L12,5.18L9.42,4.07L8,6.5L5.26,7.09L5.5,9.88L3.67,12L5.5,14.1L5.26,16.9L8,17.5L9.42,19.93L12,18.81L14.58,19.92L16,17.5L18.74,16.89L18.5,14.1L20.33,12M11,15H13V17H11V15M11,7H13V13H11V7';
    case 'danger':
      return 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z';
  }
};

/** Notificationを追加 */
export const addNotification = ({
  id = undefined,
  title = undefined,
  message,
  color = 'info',
  radius = 'md',
  loading = false,
  withBorder = true,
  withCloseButton = true,
  autoClose = 5000,
  ...otherProps
}: addNotificationProps) => {
  const messageContent = Array.isArray(message) ? message.map((item, index) => <p key={index}>{item}</p>) : message;

  showNotification({
    id,
    title: title ? <h1 className="text-md font-semibold">{title}</h1> : undefined,
    message: messageContent,
    color: getColor(color),
    radius,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d={getIcon(color)} />
      </svg>
    ),
    loading,
    withBorder,
    withCloseButton,
    autoClose,
    ...otherProps,
  });
};
