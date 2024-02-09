import { MantineProvider } from '@mantine/core';
import clsx from 'clsx';
import { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

import { NaNotifications } from '@/components/NaNotifications';
import type { NaNotificationsProps } from '@/components/NaNotifications';

import { LoginGuard } from '@/features/login/components/LoginGuard';

import indexLocalesEn from '@/utils/i18n/locales/en/index.json';
import zodLocalesEn from '@/utils/i18n/locales/en/zod.json';
import indexLocalesJa from '@/utils/i18n/locales/ja/index.json';
import zodLocalesJa from '@/utils/i18n/locales/ja/zod.json';
import { getStorageItem } from '@/utils/localStorage';

import { appLng, mantineCustomTheme } from '@/config';

import type { CustomAppProps } from 'next/app';

import '@/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const lng = getStorageItem('lng');

use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: appLng,
    lng,
    ns: ['index'],
    // debug: true,
    defaultNS: 'index',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ja: {
        index: indexLocalesJa,
        zod: zodLocalesJa,
      },
      en: {
        index: indexLocalesEn,
        zod: zodLocalesEn,
      },
    },
  });

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const notificationsProps: NaNotificationsProps = {
  position: 'top-right',
  autoClose: 5000,
  containerWidth: 400,
  notificationMaxHeight: 250,
  limit: 5,
  zIndex: 1000,
};

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  z.setErrorMap(zodI18nMap);

  return getLayout(
    <>
      <div className={clsx('select-none p-2 text-sm', notoSansJp.className)}>
        <MantineProvider theme={mantineCustomTheme}>
          <SessionProvider session={session}>
            {Component.requireLogin ? (
              <LoginGuard>
                <Component {...pageProps} />
              </LoginGuard>
            ) : (
              <Component {...pageProps} />
            )}
            <NaNotifications {...notificationsProps} />
          </SessionProvider>
        </MantineProvider>
      </div>
      <Script src="/main.js" defer />
    </>,
  );
};

export default App;
