import React from 'react';
import style from './style.module.css';
import { Checkbox } from '../Checkbox';
import { usePrefectures } from '../../api/hooks/usePrefectures';
import { PrefectureCheckboxesProps } from '../../types/resas-api';

export const PrefectureCheckboxes: React.FC<PrefectureCheckboxesProps> = ({
  selectedPrefectures,
  onChange,
}) => {
  const { isLoading, isError, prefectures } = usePrefectures();

  if (isLoading) {
    return <div>読み込み中。。。</div>;
  }

  if (isError) {
    return <div>読み込みエラー</div>;
  }

  return (
    <fieldset
      className={style.wrapper}
      role="group"
      aria-labelledby="prefecture-checkbox-group"
    >
      <legend id="prefecture-checkbox-group">都道府県を選択</legend>
      <div className={style.checkboxes}>
        {prefectures.map((prefecture) => (
          <Checkbox
            key={prefecture.prefCode}
            label={prefecture.prefName}
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            onChange={() => onChange(prefecture.prefCode)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default PrefectureCheckboxes;
