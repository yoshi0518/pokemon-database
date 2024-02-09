import aspida from '@aspida/axios';
import axios from 'axios';

import { pokeApiUrl } from '@/config';

import api from './$api';

export const pokeApiClient = api(aspida(axios, { baseURL: pokeApiUrl }));
