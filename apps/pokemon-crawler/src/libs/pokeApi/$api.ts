import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_xncz6f } from './pokemon';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://pokeapi.co/api/v2' : baseURL).replace(/\/$/, '');
  const PATH0 = '/pokemon';
  const GET = 'GET';

  return {
    pokemon: {
      get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_xncz6f['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
