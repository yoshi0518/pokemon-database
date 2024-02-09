import { Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

import { NaBaseButton } from './NaBaseButton';

/**
 * @field title タイトル
 * @field message メッセージ
 * @field visible 表示有無
 * @field color カラー
 * @field size サイズ
 * @field okLabel Okボタンラベル
 * @field cancelLabel Cancelボタンラベル。文字が指定されたらCancelボタンを表示
 * @field onClickOk OKボタンクリック時イベント
 * @field onClickCancel Cancelボタンクリック時イベント
 */
export type NaDialogProps = {
  title: string;
  message: string | string[];
  visible: boolean;
  color?: 'info' | 'success' | 'warning' | 'danger' | 'question';
  size?: 'default' | 'small' | 'large';
  okLabel: string;
  cancelLabel?: string;
  onClickOk: () => void;
  onClickCancel: () => void;
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
    case 'question':
      return 'M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z';
  }
};

/** NaDialog(共通UI) */
export const NaDialog = ({
  title,
  message,
  visible,
  color = 'info',
  size = 'default',
  okLabel,
  cancelLabel = undefined,
  onClickOk,
  onClickCancel,
}: NaDialogProps) => {
  const messageContent = Array.isArray(message) ? message.map((item, index) => <p key={index}>{item}</p>) : message;

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClickCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'relative select-none overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:p-5',
                  {
                    'sm:max-w-md': size === 'small',
                    'sm:max-w-lg': size === 'default',
                    'sm:max-w-xl': size === 'large',
                  },
                )}
              >
                <div className="sm:flex sm:items-start">
                  <div
                    className={clsx(
                      'mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:mx-0',
                      {
                        'bg-blue-100': color === 'info' || color === 'question',
                        'bg-emerald-100': color === 'success',
                        'bg-yellow-100': color === 'warning',
                        'bg-rose-100': color === 'danger',
                      },
                    )}
                  >
                    <svg
                      className={clsx('-ml-0.5 -mt-0.5 h-6 w-6', {
                        'text-blue-500': color === 'info' || color === 'question',
                        'text-emerald-500': color === 'success',
                        'text-yellow-500': color === 'warning',
                        'text-rose-500': color === 'danger',
                      })}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 22 22"
                    >
                      <path d={getIcon(color)} />
                    </svg>
                  </div>

                  <div className="grow sm:ml-3">
                    <Dialog.Title
                      as="h3"
                      className="mt-2 text-center text-base font-semibold leading-6 text-gray-500 sm:mt-2 sm:text-left"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-600">{messageContent}</div>
                  </div>
                </div>

                {cancelLabel ? (
                  <div className="mt-5 sm:flex sm:flex-row-reverse">
                    <NaBaseButton color={color === 'question' ? 'info' : color} block onClick={onClickOk}>
                      {okLabel}
                    </NaBaseButton>
                    <NaBaseButton
                      color="default"
                      variant="outline"
                      block
                      onClick={onClickCancel}
                      className="mt-2 sm:mr-2 sm:mt-0"
                    >
                      {cancelLabel}
                    </NaBaseButton>
                  </div>
                ) : (
                  <div className="mt-5 text-center sm:mx-12">
                    <NaBaseButton color={color === 'question' ? 'info' : color} block onClick={onClickOk}>
                      {okLabel}
                    </NaBaseButton>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
