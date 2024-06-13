// src/hooks/usePopulationData.ts

import useSWR from 'swr';
import { fetchPopulation } from '../resas/resas-api';
import { Prefecture, PopulationDataByPrefecture } from '../../types/resas-api';

const fetchPopulationData = async (
  prefCodes: number[],
): Promise<PopulationDataByPrefecture> => {
  const data: PopulationDataByPrefecture = {};

  await Promise.all(
    prefCodes.map(async (prefCode) => {
      const result = await fetchPopulation(prefCode);
      data[prefCode] = result;
    }),
  );

  return data;
};

export const usePopulationInfo = (selectedPrefectures: Prefecture[]) => {
  const prefCodes = selectedPrefectures.map((pref) => pref.prefCode);
  const { data, error, isLoading } = useSWR(
    () => (prefCodes.length > 0 ? ['populationData', ...prefCodes] : null),
    () => fetchPopulationData(prefCodes),
  );

  return {
    populationData: data ?? {},
    isLoading: isLoading && !data,
    isError: error,
  };
};
