// Docs: https://zenn.dev/toshiokun/articles/2ff73de5dafc76
import clsx from 'clsx';
import { Fragment } from 'react';

/**
 * @field currentPage 現在ページ数
 * @field maxPage 最大ページ数
 * @field displayCount 現在ページ前後に表示する数
 * @field loading 読み込み中
 * @field onClickMove Moveボタンクリック時イベント
 * @field onClickNext Nextボタンクリック時イベント
 * @field onClickPrev Prevボタンクリック時イベント
 */
export type NaPaginationProps = {
  currentPage: number;
  maxPage: number;
  displayCount?: number;
  loading: boolean;
  onClickMove: (page: number) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  className?: string;
};

/** NaPagination(共通UI) */
export const NaPagination = ({
  currentPage,
  maxPage,
  displayCount = 2,
  loading,
  onClickMove,
  onClickNext,
  onClickPrev,
  className = '',
}: NaPaginationProps) => {
  const left = currentPage - displayCount;
  const right = currentPage + displayCount + 1;
  const tmpPageArray: number[] = [];
  for (let page = 1; page <= maxPage; page++) {
    if (page === 1 || page === maxPage || (page >= left && page < right)) {
      tmpPageArray.push(page);
    }
  }

  const pageArray: string[] = [];
  let prevPage: number | undefined;
  for (const page of tmpPageArray) {
    if (prevPage) {
      if (page - prevPage === displayCount) {
        pageArray.push(String(prevPage + 1));
      } else if (page - prevPage !== 1) {
        pageArray.push('...');
      }
    }

    pageArray.push(String(page));
    prevPage = page;
  }

  return (
    <div className={className}>
      <nav className="isolate inline-flex select-none -space-x-px rounded-md text-sm shadow-sm">
        <a
          className={clsx(
            'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2.5 py-1.5 focus:z-20 focus:outline-offset-0',
            {
              'text-gray-700': currentPage !== 1 && !loading,
              'text-gray-400': currentPage === 1 || loading,
              'hover:bg-gray-200': currentPage !== 1 && !loading,
              'cursor-not-allowed': currentPage === 1 || loading,
              'cursor-pointer': currentPage !== 1 && !loading,
            },
          )}
          aria-label="button-prev"
          onClick={onClickPrev}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </a>

        {pageArray.map((page, index) => (
          <Fragment key={index}>
            {page === '...' && (
              <span className="relative hidden cursor-not-allowed items-center border border-gray-300 bg-white px-2.5 py-1.5 text-gray-400 focus:outline-offset-0 lg:inline-flex">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                </svg>
              </span>
            )}

            {page === String(currentPage) && (
              <a className="relative z-10 hidden cursor-not-allowed items-center bg-blue-500 px-2.5 py-1.5 font-semibold text-white lg:inline-flex">
                {page}
              </a>
            )}

            {page !== String(currentPage) && page !== '...' && (
              <a
                className={clsx(
                  'relative hidden items-center border border-gray-300 bg-white px-2.5 py-1.5 font-semibold focus:z-20 focus:outline-offset-0 lg:inline-flex',
                  {
                    'text-gray-700': !loading,
                    'text-gray-400': loading,
                    'hover:bg-gray-200': !loading,
                    'cursor-not-allowed': loading,
                    'cursor-pointer': !loading,
                  },
                )}
                onClick={() => onClickMove(Number(page))}
              >
                {page}
              </a>
            )}
          </Fragment>
        ))}

        <a
          className={clsx(
            'relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2.5 py-1.5 focus:z-20 focus:outline-offset-0',
            {
              'text-gray-700': currentPage !== maxPage && !loading,
              'text-gray-400': currentPage === maxPage || loading,
              'hover:bg-gray-200': currentPage !== maxPage && !loading,
              'cursor-not-allowed': currentPage === maxPage || loading,
              'cursor-pointer': currentPage !== maxPage && !loading,
            },
          )}
          aria-label="button-next"
          onClick={onClickNext}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </a>
      </nav>
    </div>
  );
};
