import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, ReactNode } from 'react';

import { pagesPath } from '@/libs/path/$path';

export const LoginGuard = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  console.log('=== LoginGuard ===');
  console.log({ status, router });

  /**
   * 下記2つの変更があった場合にログイン画面リダイレクトの判定を行う
   * ・認証情報に変更があった場合
   * ・ページ遷移が行われた場合
   */
  useEffect(() => {
    // 未ログインで/loginを開こうとした場合はリダイレクトなし
    if (status === 'unauthenticated' && router.pathname !== '/login') router.push(pagesPath.login.$url());
  }, [router, status]);

  // ログイン中の場合
  if (status === 'loading') return <div>Loading ...</div>;

  // ログイン済の場合
  if (status === 'authenticated') return children;
};
