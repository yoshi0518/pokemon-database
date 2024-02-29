import { NamedAPIResourceListType } from '../@types';

export type Methods = {
  get: {
    query?: {
      offset?: number;
      limit?: number;
    };
    status: 200;
    resBody: NamedAPIResourceListType;
  };
};
