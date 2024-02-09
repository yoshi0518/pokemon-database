import { ReactElement } from 'react';

import { HomePage } from '@/features/home/pages/HomePage';

import { DefaultLayout } from '@/layouts/default';

import type { CustomNextPage } from 'next';

const Page: CustomNextPage = () => <HomePage />;

Page.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
Page.requireLogin = true;

export default Page;
