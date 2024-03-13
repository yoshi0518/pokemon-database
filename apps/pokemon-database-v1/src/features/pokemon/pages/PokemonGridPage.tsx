import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { NaBaseSelect } from '@/components/NaBaseSelect';
import { NaLoading } from '@/components/NaLoading';
import { NaPagination } from '@/components/NaPagination';

import { appTitle } from '@/config';

import { useReadPokemonList } from '../hooks/useReadPokemonList';

export const PokemonGridPage = () => {
  const title = `Grid | ${appTitle}`;
  const [pagination, setPagination] = useState<{
    count: number;
    maxPage: number;
    currentPage: number;
    size: number;
  }>({
    count: 9999,
    maxPage: 999,
    currentPage: 1,
    size: 20,
  });

  const onClickMove = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };
  const onClickNext = () => {
    if (pagination.currentPage === pagination.maxPage) return;
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };
  const onClickPrev = () => {
    if (pagination.currentPage === 1) return;
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };
  const onClick = (id: string) => console.log({ id });

  const onChange = (e) => {
    setPagination((prev) => ({
      ...prev,
      size: e.target.value,
    }));
  };

  const { pokemonList, error, isLoading } = useReadPokemonList(String(pagination.currentPage), String(pagination.size));

  useEffect(() => {
    if (error || isLoading) return;
    setPagination((prev) => ({ ...prev, count: pokemonList.count, maxPage: pokemonList.maxPage }));
  }, [pokemonList, error, isLoading]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <NaLoading visible={isLoading} />;

  console.log({ pokemonList });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex items-center justify-center">
        <div>全{pagination.count}件</div>
        <NaPagination
          currentPage={pagination.currentPage}
          maxPage={pagination.maxPage}
          displayCount={2}
          loading={isLoading}
          onClickMove={onClickMove}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          className="mx-2"
        />
        <NaBaseSelect
          value={pagination.size}
          selectItems={[
            { label: '20', value: '20' },
            { label: '50', value: '50' },
            { label: '100', value: '100' },
          ]}
          onChange={onChange}
        />
      </div>

      <ul role="list" className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.data.map((pokemon) => (
          <li
            key={pokemon.id}
            className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow hover:shadow-xl"
            onClick={() => onClick(String(pokemon.id))}
          >
            <div className="flex flex-1 flex-col p-4">
              <div className="flex justify-between">
                <div className="text-left">
                  <div className="text-xl font-medium text-gray-500">{pokemon.id}</div>
                  <div className=" font-semibold text-gray-500">{pokemon.name}</div>
                </div>
                <div>
                  {pokemon.types[0] && (
                    <div className={clsx('icon p-1', pokemon.types[0])}>
                      <Image width={20} height={20} src={`/types/${pokemon.types[0]}.svg`} alt={pokemon.types[0]} />
                    </div>
                  )}
                  {pokemon.types[1] && (
                    <div className={clsx('icon mt-1.5 p-1', pokemon.types[1])}>
                      <Image width={20} height={20} src={`/types/${pokemon.types[1]}.svg`} alt={pokemon.types[1]} />
                    </div>
                  )}
                </div>
              </div>
              <Image
                className="mx-auto mt-4"
                width={142}
                height={142}
                src={`/images/${pokemon.fileName}`}
                alt={pokemon.name}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <div>全{pagination.count}件</div>
        <NaPagination
          currentPage={pagination.currentPage}
          maxPage={pagination.maxPage}
          displayCount={2}
          loading={isLoading}
          onClickMove={onClickMove}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          className="mx-2"
        />
        <NaBaseSelect
          value={pagination.size}
          selectItems={[
            { label: '20', value: '20' },
            { label: '50', value: '50' },
            { label: '100', value: '100' },
          ]}
          onChange={onChange}
        />
      </div>
    </>
  );
};
