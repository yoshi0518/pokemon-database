import { PokemonListType } from '@/libs/bffApi/@types';
import { pokeApiClient } from '@/libs/pokeApi';

import type { NextApiRequest, NextApiResponse } from 'next';

const getPokemonSpecies = async (id: string) => {
  const { body, status } = await pokeApiClient.pokemon_species._id(id).get();

  if (status !== 200) return { pokemonSpeciesData: body, pokemonSpeciesStatus: status };

  return {
    pokemonSpeciesData: {
      name: body.names.filter((name) => name.language.name === 'ja')[0].name,
      genus: body.genera.filter((genus) => genus.language.name === 'ja')[0].genus,
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
    },
    pokemonStatus: status,
  };
};

export const handleGetList = async (
  req: NextApiRequest,
  res: NextApiResponse<PokemonListType | { message: string }>,
) => {
  const page = Number(req?.query?.page) || 1;
  const size = Number(req?.query?.size) || 20;
  const query = {
    offset: String(size * (page - 1)),
    limit: String(size),
  };

  const { body, status } = await pokeApiClient.pokemon.get({ query });

  if (status !== 200) res.status(status).json({ message: 'API request failed' });

  const data = [];
  for await (const pokemon of body.results) {
    const id = pokemon.url.split('/')[6];

    const { pokemonData, pokemonStatus } = await getPokemon(id);
    if (pokemonStatus !== 200) res.status(pokemonStatus).json({ message: 'API request failed' });

    const { pokemonSpeciesData, pokemonSpeciesStatus } = await getPokemonSpecies(id);
    if (pokemonSpeciesStatus !== 200) res.status(pokemonSpeciesStatus).json({ message: 'API request failed' });

    data.push({ ...pokemonData, ...pokemonSpeciesData });
  }

  const response = {
    count: body.count,
    maxPage: Math.floor(body.count / size) + 1,
    page,
    size,
    data,
  };

  res.status(200).json(response);
};
