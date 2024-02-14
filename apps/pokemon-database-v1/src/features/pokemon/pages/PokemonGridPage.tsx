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
          selectItems={[
            { label: 'label-1', value: 'item-1' },
            { label: 'label-2', value: 'item-2' },
            { label: 'label-3', value: 'item-3' },
          ]}
        />
      </div>

      <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.data.map((pokemon) => (
          <li
            key={pokemon.id}
            className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow hover:shadow-xl"
            onClick={() => onClick(String(pokemon.id))}
          >
            <div className="flex flex-1 flex-col p-8">
              <Image
                // className="mx-auto"
                // className="mx-auto blur-sm grayscale"
                className={clsx('mx-auto', pokemon.id % 2 === 0 ? 'blur-sm grayscale' : null)}
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
          selectItems={[
            { label: 'label-1', value: 'item-1' },
            { label: 'label-2', value: 'item-2' },
            { label: 'label-3', value: 'item-3' },
          ]}
        />
      </div>
    </>
  );
};
