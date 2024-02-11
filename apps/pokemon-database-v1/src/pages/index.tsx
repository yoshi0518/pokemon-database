import { ReactElement } from 'react';

import { PokemonGridPage } from '@/features/pokemon/pages/PokemonGridPage';

import { DefaultLayout } from '@/layouts/default';

import type { CustomNextPage } from 'next';

const Page: CustomNextPage = () => <PokemonGridPage />;

Page.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default Page;
