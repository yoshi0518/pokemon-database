import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import type { ReactElement, ReactNode } from 'react';

/**
 * @see
 * Next.js Page Router Layouts
 * https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
 * https://zenn.dev/hisho/articles/fe9f4ec4a8e691
 */
declare module 'next' {
  type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    requireLogin?: boolean;
  };
}

declare module 'next/app' {
  type CustomAppProps = AppProps<{ session: Session }> & {
    Component: CustomNextPage;
  };
}
