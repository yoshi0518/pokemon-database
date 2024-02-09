import { NextApiHandler } from 'next';
// import { getServerSession } from 'next-auth';

import { pokeApiClient } from '@/libs/pokeApi';

const targetLanguages = ['ja-Hrkt', 'ja', 'en'];

// import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

const getPokemon = async (id: string) => {
  const { body, status } = await pokeApiClient.pokemon._id(id).get();

  if (status !== 200) return { pokemonData: body, pokemonStatus: status };

  const stats = {};
  body.stats.forEach((stat) => (stats[stat.stat.name] = stat.base_stat));

  const types = [];
  body.types.forEach((type) => types.push(type.type.name));

  return {
    pokemonData: {
      id: body.id,
      name: body.name,
      order: body.order,
      height: body.height,
      weight: body.weight,
      stats,
      types,
    },
    pokemonStatus: status,
  };
};

const getPokemonSpecies = async (id: string) => {
  const { body, status } = await pokeApiClient.pokemon_species._id(id).get();

  if (status !== 200) return { pokemonSpeciesData: body, pokemonSpeciesStatus: status };

  const names = {};
  body.names
    .filter((name) => targetLanguages.includes(name.language.name))
    .forEach((name) => {
      names[name.language.name] = name.name;
    });

  const genera = {};
  body.genera
    .filter((genus) => targetLanguages.includes(genus.language.name))
    .forEach((genus) => {
      genera[genus.language.name] = genus.genus;
    });

  const eggGroups = [];
  body.egg_groups.forEach((eggGroup) => eggGroups.push(eggGroup.name));

  const flavorTexts = {};
  body.flavor_text_entries
    .filter((text) => targetLanguages.includes(text.language.name))
    .forEach((text) => {
      if (text.version.name in flavorTexts === false) flavorTexts[text.version.name] = {};
      flavorTexts[text.version.name][text.language.name] = text.flavor_text;
    });

  const images = {};
  const padId = ('000' + body.id).slice(-3);
  body.varieties.forEach((variety) => {
    if (variety.pokemon.name === body.name) {
      images['default'] = `${padId}.png`;
    } else {
      const key = variety.pokemon.name.replace(`${body.name}-`, '');
      images[key] = `${padId}-${key}.png`;
    }
  });

  return {
    pokemonSpeciesData: {
      id: body.id,
      names,
      genera,
      eggGroups,
      flavorTexts,
      images,
    },
    pokemonSpeciesStatus: status,
  };
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOptions);

  // if (!session) {
  //   res.status(401).json({ message: 'You must be logged in.' });
  //   return;
  // }

  const { body, status } = await pokeApiClient.pokemon.get();

  if (status !== 200) res.status(status).json({ message: body });

  const response = [];
  for await (const item of body.results) {
    const id = item.url.split('/')[6];

    const { pokemonData, pokemonStatus } = await getPokemon(id);
    if (pokemonStatus !== 200) res.status(pokemonStatus).json({ message: pokemonData });

    const { pokemonSpeciesData, pokemonSpeciesStatus } = await getPokemonSpecies(id);
    if (pokemonSpeciesStatus !== 200) res.status(pokemonSpeciesStatus).json({ message: pokemonSpeciesData });

    response.push({ ...pokemonData, ...pokemonSpeciesData });
  }

  res.status(200).json(response);
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
  }
};

export default handler;
