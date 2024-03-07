import aspida from '@aspida/axios';
import axios from 'axios';

import api from './$api';

export const pokeApiClient = api(
  aspida(axios, { baseURL: process.env.NEXT_PUBLIC_POKE_API_URL || 'https://pokeapi.co/api/v2' }),
);
