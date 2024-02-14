import Head from 'next/head';
import Image from 'next/image';

import { appTitle } from '@/config';

import { useReadPokemonList } from '../hooks/useReadPokemonList';


export const PokemonGridPage = () => {
  const title = `PokemonList | ${appTitle}`;

  const { pokemonList, error, isLoading } = useReadPokemonList();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log({ pokemonList });

  const onClick = (id: string) => console.log({ id });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.id}
            className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow hover:shadow-xl"
            onClick={() => onClick(String(pokemon.id))}
          >
            <div className="flex flex-1 flex-col p-8">
              <Image
                className="mx-auto"
                width={128}
                height={128}
                src={`/images/${pokemon.fileName}`}
                alt={pokemon.name}
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{pokemon.name}</h3>
              <div className="flex justify-between hover:bg-gray-50">
                <div>Id</div>
                <div className="text-right">{pokemon.id}</div>
              </div>
              <div className="flex justify-between hover:bg-gray-50">
                <div>Type</div>
                <div>
                  {pokemon.types.map((type) => (
                    <p key={type} className="text-right">
                      {type}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between hover:bg-gray-50">
                <div>Genera</div>
                <div className="text-right">{pokemon.genus}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
