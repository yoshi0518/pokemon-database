import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  await prisma.$executeRaw`
DROP view IF EXISTS v_pokemon;
  `;

  await prisma.$executeRaw`
CREATE VIEW v_pokemon as
SELECT
  t_crawler_pokemon.id,
  t_crawler_pokemon_species_names.name,
  t_crawler_pokemon_types.type_1,
  t_crawler_pokemon_types.type_2,
  t_crawler_pokemon_species_genera.genus,
  concat(
    RIGHT(
      concat('000', CONVERT(t_crawler_pokemon.id, CHAR)),
      3
    ),
    '.png'
  ) AS \`image\`
FROM
  t_crawler_pokemon
  LEFT JOIN (
    SELECT
      t_crawler_pokemon_species_names.id,
      t_crawler_pokemon_species_names.name
    FROM
      t_crawler_pokemon_species_names
    WHERE
      t_crawler_pokemon_species_names.language = 'ja-Hrkt'
  ) AS \`t_crawler_pokemon_species_names\` ON t_crawler_pokemon_species_names.id = t_crawler_pokemon.id
  LEFT JOIN (
    SELECT
      tmp.id,
      max(tmp.type_1) AS \`type_1\`,
      max(tmp.type_2) AS \`type_2\`
    FROM
      (
        SELECT
          t_crawler_pokemon_types.id,
          CASE
            WHEN t_crawler_pokemon_types.row_no = 1 THEN t_crawler_pokemon_types.type
            ELSE NULL
          END AS \`type_1\`,
          CASE
            WHEN t_crawler_pokemon_types.row_no = 2 THEN t_crawler_pokemon_types.type
            ELSE NULL
          END AS \`type_2\`
        FROM
          t_crawler_pokemon_types
      ) AS \`tmp\`
    GROUP BY
      tmp.id
  ) AS \`t_crawler_pokemon_types\` ON t_crawler_pokemon_types.id = t_crawler_pokemon.id
  LEFT JOIN (
    SELECT
      t_crawler_pokemon_species_genera.id,
      t_crawler_pokemon_species_genera.genus
    FROM
      t_crawler_pokemon_species_genera
    WHERE
      t_crawler_pokemon_species_genera.language = 'ja-Hrkt'
  ) AS \`t_crawler_pokemon_species_genera\` ON t_crawler_pokemon_species_genera.id = t_crawler_pokemon.id
-- ORDER BY
--  t_crawler_pokemon.id;
  `;
};

main()
  .catch((error) => {
    console.error('Error: ', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
