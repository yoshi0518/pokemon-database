import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

/**
 * @field visible 表示有無
 * @field full 全画面表示有無
 * @field type ローディングスタイル(spinner or circle)
 */
export type NaLoadingProps = {
  visible: boolean;
  full?: boolean;
  type?: 'spinner' | 'circle';
};

/** NaLoading(共通UI) */
export const NaLoading = ({ visible, full = true, type = 'spinner' }: NaLoadingProps) => (
  <Transition.Root show={visible} as={Fragment}>
    <div>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={clsx('inset-0 bg-gray-900/70', full ? 'fixed' : 'absolute')}></div>
      </Transition.Child>

      <div className={clsx('inset-0 z-50 overflow-y-auto', full ? 'fixed' : 'absolute')}>
        <div className="flex min-h-full items-center justify-center  p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex justify-center">
              {type === 'spinner' && (
                <>
                  <div className="mr-7 h-2 w-2 animate-ping rounded-full bg-blue-300" />
                  <div className="mr-7 h-2 w-2 animate-ping rounded-full bg-blue-300" />
                  <div className="h-2 w-2 animate-ping rounded-full bg-blue-300" />
                </>
              )}
              {type === 'circle' && (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-300 border-t-transparent" />
              )}
            </div>
          </Transition.Child>
        </div>
      </div>
    </div>
  </Transition.Root>
);
