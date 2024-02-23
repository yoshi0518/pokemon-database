import aspida from '@aspida/axios';
import axios from 'axios';

import api from './$api';

export const pokeApiClient = api(aspida(axios, { baseURL: process.env.POKE_API_URL }));
