import axios from 'axios';
import { Prefecture } from '../../types/types';

const API_KEY = import.meta.env.VITE_RESAS_API_KEY;
const BASE_URL = 'https://opendata.resas-portal.go.jp';

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/prefectures`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Failed to fetch prefectures',
      );
    }
    throw new Error('Failed to fetch prefectures');
  }
};
