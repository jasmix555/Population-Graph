import { useState } from 'react';
import style from './style.module.css';
import { Checkbox } from '../Checkbox';
import { usePrefectures } from '../../api/hooks/usePrefectures';
import { Prefecture } from '../../types/resas-api';
import { regions } from '../../types/regions';

export const PrefectureCheckboxes = () => {
  const { prefectures, isLoading, isError } = usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

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

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const filteredPrefectures =
    selectedRegion ?
      prefectures.filter((prefecture) =>
        regions[selectedRegion].includes(prefecture.prefCode),
      )
    : prefectures;

  const handleUncheckAll = () => {
    setSelectedPrefectures([]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching prefectures</div>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.buttons}>
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className={style.select}
        >
          <option value="">全ての地域</option>
          {Object.keys(regions).map((region) => (
            <option
              key={region}
              value={region}
            >
              {region}
            </option>
          ))}
        </select>
        <button
          className={style.reset}
          type="button"
          onClick={handleUncheckAll}
        >
          選択を解除
        </button>
      </div>

      <div className={style.checkboxes}>
        {filteredPrefectures.map((prefecture: Prefecture) => (
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
