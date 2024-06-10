import useSWR from 'swr';
import { fetchPrefectures } from '../resas/resas-api';
import { Prefecture } from '../../types/resas-api';

const fetcher = async () => {
  const data = await fetchPrefectures();
  return data;
};

export const usePrefectures = () => {
  const { data, error, isLoading } = useSWR<Prefecture[]>(
    'prefectures',
    fetcher,
  );

  return {
    prefectures: data ?? [],
    isLoading,
    isError: error,
  };
};
