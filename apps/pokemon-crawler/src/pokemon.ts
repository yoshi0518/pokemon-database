import { pokeApiClient } from './libs/pokeApi';
import { prisma } from './libs/prisma';

const main = async () => {
  await prisma.$executeRaw`
truncate table t_pokemon;
  `;

  const { body } = await pokeApiClient.pokemon.get({ query: { offset: '40', limit: '20' } });
  console.log({ ...body });
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
