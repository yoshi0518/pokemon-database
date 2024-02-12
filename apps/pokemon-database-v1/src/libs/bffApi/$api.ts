import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1yox9z4 } from './api/pokemon';
import type { Methods as Methods_vn79fg } from './api/pokemon/_id@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/pokemon';
  const GET = 'GET';

  return {
    api: {
      pokemon: {
        _id: (val2: string) => {
          const prefix2 = `${PATH0}/${val2}`;

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_vn79fg['get']['resBody'], BasicHeaders, Methods_vn79fg['get']['status']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_vn79fg['get']['resBody'], BasicHeaders, Methods_vn79fg['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        get: (option?: { query?: Methods_1yox9z4['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1yox9z4['get']['resBody'], BasicHeaders, Methods_1yox9z4['get']['status']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { query?: Methods_1yox9z4['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1yox9z4['get']['resBody'], BasicHeaders, Methods_1yox9z4['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1yox9z4['get']['query'] } | undefined) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
