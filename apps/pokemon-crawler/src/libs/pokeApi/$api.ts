import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_wsf7w5 } from './egg-group';
import type { Methods as Methods_iyu7zr } from './egg-group/_id@number';
import type { Methods as Methods_gsypk3 } from './gender';
import type { Methods as Methods_njuqr1 } from './gender/_id@number';
import type { Methods as Methods_5v1uhi } from './growth-rate';
import type { Methods as Methods_9bkniq } from './growth-rate/_id@number';
import type { Methods as Methods_xncz6f } from './pokemon';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://pokeapi.co/api/v2' : baseURL).replace(/\/$/, '');
  const PATH0 = '/egg-group';
  const PATH1 = '/gender';
  const PATH2 = '/growth-rate';
  const PATH3 = '/pokemon';
  const GET = 'GET';

  return {
    egg_group: {
      _id: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_iyu7zr['get']['resBody'], BasicHeaders, Methods_iyu7zr['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_iyu7zr['get']['resBody'], BasicHeaders, Methods_iyu7zr['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_wsf7w5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_wsf7w5['get']['resBody'], BasicHeaders, Methods_wsf7w5['get']['status']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods_wsf7w5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_wsf7w5['get']['resBody'], BasicHeaders, Methods_wsf7w5['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_wsf7w5['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    gender: {
      _id: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_njuqr1['get']['resBody'], BasicHeaders, Methods_njuqr1['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_njuqr1['get']['resBody'], BasicHeaders, Methods_njuqr1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_gsypk3['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_gsypk3['get']['resBody'], BasicHeaders, Methods_gsypk3['get']['status']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { query?: Methods_gsypk3['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_gsypk3['get']['resBody'], BasicHeaders, Methods_gsypk3['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_gsypk3['get']['query'] } | undefined) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    growth_rate: {
      _id: (val1: number) => {
        const prefix1 = `${PATH2}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_9bkniq['get']['resBody'], BasicHeaders, Methods_9bkniq['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_9bkniq['get']['resBody'], BasicHeaders, Methods_9bkniq['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_5v1uhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_5v1uhi['get']['resBody'], BasicHeaders, Methods_5v1uhi['get']['status']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { query?: Methods_5v1uhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_5v1uhi['get']['resBody'], BasicHeaders, Methods_5v1uhi['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_5v1uhi['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    pokemon: {
      get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH3, GET, option).json(),
      $get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_xncz6f['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
