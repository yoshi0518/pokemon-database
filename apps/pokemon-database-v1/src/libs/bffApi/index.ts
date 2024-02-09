import aspida from '@aspida/axios';
import axios from 'axios';

import api from './$api';

import { bffApiUrl } from '@/config';

export const bffApiClient = api(aspida(axios, { baseURL: bffApiUrl }));
