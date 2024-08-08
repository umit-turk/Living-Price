import axios from 'axios';
import { ApiResponse } from './types';

const API_HOST = 'cost-of-living-and-prices.p.rapidapi.com';
const API_KEY = '3ecabe80e5msh997b87e1b3a8575p11d32fjsn0eac94ad67a9';

export const fetchPrices = async (city_name: string, country_name: string): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `https://${API_HOST}/prices`,
    {
      params: {
        city_name,
        country_name
      },
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    }
  );

  return response.data;
};
