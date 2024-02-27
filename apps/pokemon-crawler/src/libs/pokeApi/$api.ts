import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1g2z700 } from './ability';
import type { Methods as Methods_1ykoezg } from './ability/_id@number';
import type { Methods as Methods_15l18wf } from './characteristic';
import type { Methods as Methods_v0hkm1 } from './characteristic/_id@number';
import type { Methods as Methods_wsf7w5 } from './egg-group';
import type { Methods as Methods_iyu7zr } from './egg-group/_id@number';
import type { Methods as Methods_gsypk3 } from './gender';
import type { Methods as Methods_njuqr1 } from './gender/_id@number';
import type { Methods as Methods_5v1uhi } from './growth-rate';
import type { Methods as Methods_9bkniq } from './growth-rate/_id@number';
import type { Methods as Methods_edaidx } from './nature';
import type { Methods as Methods_1enxcrb } from './nature/_id@number';
import type { Methods as Methods_10ps824 } from './pokeathlon-stat';
import type { Methods as Methods_ra7nqg } from './pokeathlon-stat/_id@number';
import type { Methods as Methods_xncz6f } from './pokemon';
import type { Methods as Methods_2hlju9 } from './pokemon-color';
import type { Methods as Methods_1hv6hpf } from './pokemon-color/_id@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://pokeapi.co/api/v2' : baseURL).replace(/\/$/, '');
  const PATH0 = '/ability';
  const PATH1 = '/characteristic';
  const PATH2 = '/egg-group';
  const PATH3 = '/gender';
  const PATH4 = '/growth-rate';
  const PATH5 = '/nature';
  const PATH6 = '/pokeathlon-stat';
  const PATH7 = '/pokemon';
  const PATH8 = '/pokemon-color';
  const GET = 'GET';

  return {
    ability: {
      _id: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1ykoezg['get']['resBody'], BasicHeaders, Methods_1ykoezg['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1ykoezg['get']['resBody'], BasicHeaders, Methods_1ykoezg['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_1g2z700['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_1g2z700['get']['resBody'], BasicHeaders, Methods_1g2z700['get']['status']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods_1g2z700['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_1g2z700['get']['resBody'], BasicHeaders, Methods_1g2z700['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1g2z700['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    characteristic: {
      _id: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_v0hkm1['get']['resBody'], BasicHeaders, Methods_v0hkm1['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_v0hkm1['get']['resBody'], BasicHeaders, Methods_v0hkm1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_15l18wf['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_15l18wf['get']['resBody'], BasicHeaders, Methods_15l18wf['get']['status']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { query?: Methods_15l18wf['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_15l18wf['get']['resBody'], BasicHeaders, Methods_15l18wf['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_15l18wf['get']['query'] } | undefined) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    egg_group: {
      _id: (val1: number) => {
        const prefix1 = `${PATH2}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_iyu7zr['get']['resBody'], BasicHeaders, Methods_iyu7zr['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_iyu7zr['get']['resBody'], BasicHeaders, Methods_iyu7zr['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_wsf7w5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_wsf7w5['get']['resBody'], BasicHeaders, Methods_wsf7w5['get']['status']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { query?: Methods_wsf7w5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_wsf7w5['get']['resBody'], BasicHeaders, Methods_wsf7w5['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_wsf7w5['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    gender: {
      _id: (val1: number) => {
        const prefix1 = `${PATH3}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_njuqr1['get']['resBody'], BasicHeaders, Methods_njuqr1['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_njuqr1['get']['resBody'], BasicHeaders, Methods_njuqr1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_gsypk3['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_gsypk3['get']['resBody'], BasicHeaders, Methods_gsypk3['get']['status']>(prefix, PATH3, GET, option).json(),
      $get: (option?: { query?: Methods_gsypk3['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_gsypk3['get']['resBody'], BasicHeaders, Methods_gsypk3['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_gsypk3['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    growth_rate: {
      _id: (val1: number) => {
        const prefix1 = `${PATH4}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_9bkniq['get']['resBody'], BasicHeaders, Methods_9bkniq['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_9bkniq['get']['resBody'], BasicHeaders, Methods_9bkniq['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_5v1uhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_5v1uhi['get']['resBody'], BasicHeaders, Methods_5v1uhi['get']['status']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { query?: Methods_5v1uhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_5v1uhi['get']['resBody'], BasicHeaders, Methods_5v1uhi['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_5v1uhi['get']['query'] } | undefined) =>
        `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    nature: {
      _id: (val1: number) => {
        const prefix1 = `${PATH5}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1enxcrb['get']['resBody'], BasicHeaders, Methods_1enxcrb['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1enxcrb['get']['resBody'], BasicHeaders, Methods_1enxcrb['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_edaidx['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_edaidx['get']['resBody'], BasicHeaders, Methods_edaidx['get']['status']>(prefix, PATH5, GET, option).json(),
      $get: (option?: { query?: Methods_edaidx['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_edaidx['get']['resBody'], BasicHeaders, Methods_edaidx['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_edaidx['get']['query'] } | undefined) =>
        `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    pokeathlon_stat: {
      _id: (val1: number) => {
        const prefix1 = `${PATH6}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_ra7nqg['get']['resBody'], BasicHeaders, Methods_ra7nqg['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_ra7nqg['get']['resBody'], BasicHeaders, Methods_ra7nqg['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_10ps824['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_10ps824['get']['resBody'], BasicHeaders, Methods_10ps824['get']['status']>(prefix, PATH6, GET, option).json(),
      $get: (option?: { query?: Methods_10ps824['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_10ps824['get']['resBody'], BasicHeaders, Methods_10ps824['get']['status']>(prefix, PATH6, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_10ps824['get']['query'] } | undefined) =>
        `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    pokemon: {
      get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { query?: Methods_xncz6f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_xncz6f['get']['resBody'], BasicHeaders, Methods_xncz6f['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_xncz6f['get']['query'] } | undefined) =>
        `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    pokemon_color: {
      _id: (val1: number) => {
        const prefix1 = `${PATH8}/${val1}`;

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1hv6hpf['get']['resBody'], BasicHeaders, Methods_1hv6hpf['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1hv6hpf['get']['resBody'], BasicHeaders, Methods_1hv6hpf['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      get: (option?: { query?: Methods_2hlju9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_2hlju9['get']['resBody'], BasicHeaders, Methods_2hlju9['get']['status']>(prefix, PATH8, GET, option).json(),
      $get: (option?: { query?: Methods_2hlju9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods_2hlju9['get']['resBody'], BasicHeaders, Methods_2hlju9['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_2hlju9['get']['query'] } | undefined) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
