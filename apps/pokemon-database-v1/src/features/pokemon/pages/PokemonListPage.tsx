import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { NaBaseButton } from '@/components/NaBaseButton';

import { pagesPath } from '@/libs/path/$path';

import { appTitle } from '@/config';

import { useReadPokemonList } from '../hooks/useReadPokemonList';

export const PokemonListPage = () => {
  const title = `PokemonList | ${appTitle}`;
  const router = useRouter();

  const { pokemonList, error, isLoading } = useReadPokemonList();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log({ pokemonList });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1 className="text-lg font-semibold">PokemonListPage</h1>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-blue-200 text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              {'images' in pokemon && (
                <Image
                  className="mx-auto"
                  width={128}
                  height={128}
                  src={`/images/${pokemon.images['default']}`}
                  alt=""
                />
              )}
              <h3 className="mt-6 text-sm font-medium text-gray-900">{pokemon.names['ja']}</h3>
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
                <div className="text-right">{pokemon.genera['ja']}</div>
              </div>
              <div className="flex justify-between hover:bg-gray-50">
                <div>EggGroups</div>
                <div>
                  {pokemon.eggGroups.map((eggGroup) => (
                    <p key={eggGroup} className="text-right">
                      {eggGroup}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between hover:bg-gray-50">
                <div>Height/Weight</div>
                <div className="text-right">
                  {pokemon.height} / {pokemon.weight}
                </div>
              </div>
              <div className="flex justify-between hover:bg-gray-50">
                <div>Status</div>
                <div className="text-right">
                  <p>Hp：{pokemon.stats.hp}</p>
                  <p>Attack：{pokemon.stats.attack}</p>
                  <p>Defense：{pokemon.stats.defense}</p>
                  <p>Special Attack：{pokemon.stats['special-attack']}</p>
                  <p>Special Defense：{pokemon.stats['special-defense']}</p>
                  <p>Speed：{pokemon.stats.speed}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <NaBaseButton variant="outline" onClick={() => router.push(pagesPath.$url())}>
          HomePageへ移動
        </NaBaseButton>
      </div>
    </>
  );
};
