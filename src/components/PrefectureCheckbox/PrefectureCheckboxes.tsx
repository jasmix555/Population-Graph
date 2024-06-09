import React, { useState } from 'react';
import style from './style.module.css';
import { Checkbox } from '../Checkbox';
import { usePrefectures } from '../../api/hooks/usePrefectures';
import { Prefecture } from '../../types/resas-api';

export const PrefectureCheckboxes: React.FC = () => {
  const { prefectures, isLoading, isError } = usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    prefCode: number,
  ) => {
    if (event.target.checked) {
      setSelectedPrefectures([...selectedPrefectures, prefCode]);
    } else {
      setSelectedPrefectures(
        selectedPrefectures.filter((code) => code !== prefCode),
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching prefectures</div>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.checkboxes}>
        {prefectures.map((prefecture: Prefecture) => (
          <Checkbox
            key={prefecture.prefCode}
            label={prefecture.prefName}
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            onChange={(event) =>
              handleCheckboxChange(event, prefecture.prefCode)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PrefectureCheckboxes;
