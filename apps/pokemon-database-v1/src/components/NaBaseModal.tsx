import { Transition, Dialog } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

import { NaBaseButton } from './NaBaseButton';

/**
 * @field title タイトル
 * @field visible 表示有無
 * @field icon アイコン
 * @field okLabel Okボタンラベル
 * @field cancelLabel Cancelボタンラベル
 * @field onClickOk Okボタンクリック時イベント
 * @field onClickCancel Cancelボタンクリック時イベント
 */
export type NaBaseModalProps = PropsWithChildren<{
  title: string;
  visible: boolean;
  icon?: string;
  okLabel: string;
  cancelLabel: string;
  onClickOk: () => void;
  onClickCancel: () => void;
}>;

/** NaBaseModal(共通UI) */
export const NaBaseModal = ({
  children,
  title,
  visible,
  icon = 'M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z',
  okLabel,
  cancelLabel,
  onClickOk,
  onClickCancel,
}: NaBaseModalProps) => (
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

      <div className="fixed inset-0 z-10 select-none overflow-y-auto">
        <div className="flex min-h-full items-start justify-center px-2 pt-8 text-center sm:items-center sm:p-0 md:items-center md:p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="flex w-[90%] flex-col rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-[80%] sm:max-w-[600px] md:w-[70%]">
              <div className="flex items-center rounded-t-lg border-b bg-gray-900/90 px-4 py-2">
                <svg
                  className="-mt-0.5 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 22 22"
                >
                  <path d={icon} />
                </svg>

                <Dialog.Title as="h3" className="ml-3 grow text-sm font-semibold text-white">
                  {title}
                </Dialog.Title>

                <div className="flex-row-reverse">
                  <button
                    type="button"
                    className="text-semibold inline-flex justify-end rounded-lg p-1.5 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={onClickCancel}
                  >
                    <svg
                      className="h-3 w-3"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="max-h-[calc(100vh-250px)] overflow-y-scroll p-4 text-sm md:max-h-[calc(100vh-360px)]">
                  {children}
                </div>
              </div>
              <div className="flex items-center justify-end rounded-b-lg border bg-gray-100 px-4 py-3">
                <div className="grow" />
                <NaBaseButton color="info" onClick={onClickOk} className="mr-2 shadow-md">
                  {okLabel}
                </NaBaseButton>
                <NaBaseButton color="default" variant="outline" onClick={onClickCancel} className="shadow-md">
                  {cancelLabel}
                </NaBaseButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
