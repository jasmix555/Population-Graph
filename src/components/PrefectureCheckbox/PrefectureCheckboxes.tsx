import { useState } from 'react';
import style from './style.module.css';
import { Checkbox } from '../Checkbox';
import { usePrefectures } from '../../api/hooks/usePrefectures';
import { useFilteredPrefectures } from '../../hooks/useFilteredPrefectures';
import { regions } from '../../types/regions';

interface Props {
  selectedPrefectures: number[];
  onChange: (selectedPrefectureCode: number) => void;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<number[]>>;
}

export const PrefectureCheckboxes = ({
  selectedPrefectures,
  onChange,
  setSelectedPrefectures,
}: Props) => {
  const { isLoading, isError, prefectures } = usePrefectures();
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const filteredPrefectures = useFilteredPrefectures(
    prefectures,
    selectedRegion,
  );

  const handleUncheckAll = () => {
    setSelectedPrefectures([]);
  };

  if (isLoading) {
    return <div>読み込み中。。。</div>;
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
        {filteredPrefectures.map((prefecture) => (
          <Checkbox
            key={prefecture.prefCode}
            label={prefecture.prefName}
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            onChange={() => onChange(prefecture.prefCode)}
          />
        ))}
      </div>
    </div>
  );
};

export default PrefectureCheckboxes;
