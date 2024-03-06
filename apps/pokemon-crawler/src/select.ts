import { prisma } from '@project/database';

const main = async () => {
  const pokemon = await prisma.pokemonView.findMany({
    skip: 0,
    // skip: 20,
    take: 20,
  });

  console.log({ ...pokemon });
};

main()
  .catch((error) => {
    console.error('Error: ', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
