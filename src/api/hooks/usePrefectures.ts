import useSWR from 'swr';
import { fetchPrefectures } from '../resas/resas-api';
import { Prefecture } from '../types/resas-types';

const fetcher = async () => {
  try {
    const data = await fetchPrefectures();
    return data;
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    throw error; // Re-throw the error to be caught by useSWR
  }
};

export const usePrefectures = () => {
  const { data, error, isLoading } = useSWR<Prefecture[]>(
    'prefectures',
    fetcher,
  );

  return {
    prefectures: data ?? [],
    isLoading: isLoading && !error,
    isError: error,
  };
};
