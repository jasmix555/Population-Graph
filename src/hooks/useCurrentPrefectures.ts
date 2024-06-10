import { useEffect, useState } from 'react';
import { Prefecture } from '../types/resas-api';

const useCurrentPrefectures = (
  selectedPrefectures: number[],
  prefectures: Prefecture[],
) => {
  const [currentPrefectures, setCurrentPrefectures] = useState<Prefecture[]>(
    [],
  );

  useEffect(() => {
    if (prefectures.length > 0) {
      const initialPrefectures = selectedPrefectures
        .map((prefCode) =>
          prefectures.find((pref) => pref.prefCode === prefCode),
        )
        .filter((pref): pref is Prefecture => pref !== undefined); // Filter out undefined values
      setCurrentPrefectures(initialPrefectures);
    }
  }, [prefectures, selectedPrefectures]);

  return { currentPrefectures, setCurrentPrefectures };
};

export default useCurrentPrefectures;
