import { useMemo } from 'react';
import { Prefecture } from '../types/resas-api';
import { regions } from '../types/regions';

export const useFilteredPrefectures = (
  prefectures: Prefecture[],
  selectedRegion: string,
) => {
  const filteredPrefectures = useMemo(() => {
    return selectedRegion ?
        prefectures.filter((prefecture) =>
          regions[selectedRegion].includes(prefecture.prefCode),
        )
      : prefectures;
  }, [prefectures, selectedRegion]);

  return filteredPrefectures;
};
