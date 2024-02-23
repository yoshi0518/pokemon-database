import axios from 'axios';

import { prisma } from './libs/prisma';

import type { NamedAPIResourceListType } from './types';
import type { AxiosResponse } from 'axios';

const main = async () => {
  await prisma.$executeRaw`
    truncate table t_pokemon;
  `;

  const response: AxiosResponse<NamedAPIResourceListType> = await axios.get('https://pokeapi.co/api/v2/pokemon');

  console.log({
    status: response.status,
    data: JSON.stringify(response.data),
  });
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
