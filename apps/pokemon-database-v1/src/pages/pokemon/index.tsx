import { ReactElement } from 'react';

import { PokemonListPage } from '@/features/pokemon/pages/PokemonListPage';

import { DefaultLayout } from '@/layouts/default';

import type { CustomNextPage } from 'next';

const Page: CustomNextPage = () => <PokemonListPage />;

Page.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
Page.requireLogin = true;

export default Page;
