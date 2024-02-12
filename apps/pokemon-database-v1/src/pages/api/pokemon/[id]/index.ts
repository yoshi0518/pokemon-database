import { NextApiHandler } from 'next';

import { PokemonDetailType } from '@/libs/bffApi/@types';
import { pokeApiClient } from '@/libs/pokeApi';

import type { NextApiRequest, NextApiResponse } from 'next';

const getPokemonSpecies = async (id: string) => {
  const { body, status } = await pokeApiClient.pokemon_species._id(id).get();

  if (status !== 200) return { pokemonSpeciesData: body, pokemonSpeciesStatus: status };

  const targetFlavorText = body.flavor_text_entries.filter(
    (flavorText) => flavorText.language.name === 'ja' && flavorText.version.name === 'x',
  );

  return {
    pokemonSpeciesData: {
      name: body.names.filter((name) => name.language.name === 'ja')[0].name,
      genus: body.genera.filter((genus) => genus.language.name === 'ja')[0].genus,
      flavorText: targetFlavorText.length === 0 ? null : targetFlavorText[0].flavor_text,
    },
    pokemonSpeciesStatus: status,
  };
};

const getPokemon = async (id: string) => {
  const { body, status } = await pokeApiClient.pokemon._id(id).get();

  if (status !== 200) return { pokemonData: body, pokemonStatus: status };

  return {
    pokemonData: {
      id: body.id,
      fileName: `${('000' + body.id).slice(-3)}.png`,
      types: body.types.map(({ type }) => type.name),
      height: body.height,
      weight: body.weight,
      stats: body.stats.reduce((obj, { stat, base_stat }) => {
        obj[stat.name] = base_stat;
        return obj;
      }, {}),
    },
    pokemonStatus: status,
  };
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<PokemonDetailType | { message: string }>) => {
  const id = req.query.id;

  const { pokemonData, pokemonStatus } = await getPokemon(id as string);
  if (pokemonStatus !== 200) res.status(pokemonStatus).json({ message: 'API request failed' });

  const { pokemonSpeciesData, pokemonSpeciesStatus } = await getPokemonSpecies(id as string);
  if (pokemonSpeciesStatus !== 200) res.status(pokemonSpeciesStatus).json({ message: 'API request failed' });

  res.status(200).json({ ...pokemonData, ...pokemonSpeciesData });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PokemonDetailType | { message: string }>,
) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
  }
};

export default handler;
