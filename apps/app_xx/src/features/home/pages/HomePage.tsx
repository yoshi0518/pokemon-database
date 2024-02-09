import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';

import { NaBaseButton } from '@/components/NaBaseButton';

import { appTitle } from '@/config';

export const HomePage = () => {
  const title = `Home | ${appTitle}`;
  const { data: session, status } = useSession();

  // console.log('=== Auth.js ===');
  // console.log({ session, status });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1 className="text-lg font-semibold">HomePage</h1>
      <main>
        <h2>ユーザー情報</h2>
        {status === 'authenticated' ? (
          <>
            <div>Name：{session.user.name}</div>
            <div>Email：{session.user.email}</div>
            <div>Image：{session.user.image}</div>
            <div>Expires：{session.expires}</div>
          </>
        ) : (
          <div>Loading ...</div>
        )}
      </main>
      <div>
        <NaBaseButton color="info" onClick={async () => await signOut({ callbackUrl: '/login?onLogout' })}>
          ログアウト
        </NaBaseButton>
      </div>
    </>
  );
};
