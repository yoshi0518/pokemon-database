import { NamedAPIResourceListType } from '../@types';

export type Methods = {
  get: {
    query?: {
      offset?: string;
      limit?: string;
    };
    status: 200;
    resBody: NamedAPIResourceListType;
  };
};
