import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { NaBaseButton } from '@/components/NaBaseButton';

import { appTitle } from '@/config';

export const LoginPage = () => {
  const title = `Login | ${appTitle}`;
  const router = useRouter();

  console.log({ router });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1 className="text-lg font-semibold">LoginPage</h1>

      <main>
        <NaBaseButton color="info" onClick={() => signIn('google', { callbackUrl: '/' })}>
          Googleログイン
        </NaBaseButton>
      </main>
      {'onLogout' in router.query && <div className="mt-2 text-red-500">ログアウトが完了しました</div>}
    </>
  );
};
