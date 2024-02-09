import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1yox9z4 } from './api/pokemon';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/pokemon';
  const GET = 'GET';

  return {
    api: {
      pokemon: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1yox9z4['get']['resBody'], BasicHeaders, Methods_1yox9z4['get']['status']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1yox9z4['get']['resBody'], BasicHeaders, Methods_1yox9z4['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
