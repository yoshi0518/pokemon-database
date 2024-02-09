import { Transition, Dialog } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

import { NaBaseButton } from './NaBaseButton';

/**
 * @field visible 表示有無
 * @field onClickSearch 検索ボタンクリック時イベント
 * @field onClickClear 解除ボタンクリック時イベント
 * @field onClickClose 閉じるボタンクリック時イベント
 */
export type NaSearchModalProps = PropsWithChildren<{
  visible: boolean;
  onClickSearch: () => void;
  onClickClear: () => void;
  onClickClose: () => void;
}>;

/** NaSearchModal(共通UI) */
export const NaSearchModal = ({ children, visible, onClickSearch, onClickClear, onClickClose }: NaSearchModalProps) => (
  <Transition.Root show={visible} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClickClose}>
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
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>

                <Dialog.Title as="h3" className="ml-3 grow text-sm font-semibold text-white">
                  条件検索
                </Dialog.Title>

                <div className="flex-row-reverse">
                  <button
                    type="button"
                    className="text-semibold inline-flex justify-end rounded-lg p-1.5 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={onClickClose}
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
                <NaBaseButton color="default" onClick={onClickClear} className="shadow-md">
                  解除
                </NaBaseButton>
                <div className="grow" />
                <NaBaseButton color="info" onClick={onClickSearch} className="mr-2 shadow-md">
                  検索
                </NaBaseButton>
                <NaBaseButton color="default" variant="outline" onClick={onClickClose} className="shadow-md">
                  閉じる
                </NaBaseButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
