import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_xncz6f } from './pokemon';
import type { Methods as Methods_exr7nd } from './pokemon/_id@string';
import type { Methods as Methods_v1bpj8 } from './pokemon-species';
import type { Methods as Methods_1abqz6g } from './pokemon-species/_id@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'undefined' : baseURL).replace(/\/$/, '');
  const PATH0 = '/pokemon';
  const PATH1 = '/pokemon-species';
  const GET = 'GET';

  return {
    pokemon: {
      _id: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_exr7nd['get']['resBody'], BasicHeaders, Methods_exr7nd['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_exr7nd['get']['resBody'], BasicHeaders, Methods_exr7nd['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_xncz6f['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    pokemon_species: {
      _id: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1abqz6g['get']['resBody'], BasicHeaders, Methods_1abqz6g['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1abqz6g['get']['resBody'], BasicHeaders, Methods_1abqz6g['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_v1bpj8['get']['resBody'], BasicHeaders, Methods_v1bpj8['get']['status']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_v1bpj8['get']['resBody'], BasicHeaders, Methods_v1bpj8['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
