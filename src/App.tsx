import React from 'react';
import { PrefectureCheckboxes } from './components/PrefectureCheckbox';
import { usePrefectures } from './api/hooks/usePrefectures';
import useLocalStorage from './hooks/useLocalStorage';
import { PopulationChart } from './components/PopulationChart';
import useCurrentPrefectures from './hooks/useCurrentPrefectures';
import style from './App.module.css';

const App: React.FC = () => {
  const { prefectures, isLoading, isError } = usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useLocalStorage<
    number[]
  >('selectedPrefectures', []);
  const { currentPrefectures, setCurrentPrefectures } = useCurrentPrefectures(
    selectedPrefectures,
    prefectures,
  );

  const handlePrefectureChange = (prefCode: number) => {
    setSelectedPrefectures((prevSelected) =>
      prevSelected.includes(prefCode) ?
        prevSelected.filter((code) => code !== prefCode)
      : [...prevSelected, prefCode],
    );

    const selectedPrefecture = prefectures.find(
      (pref) => pref.prefCode === prefCode,
    );
    if (selectedPrefecture) {
      setCurrentPrefectures((prevSelected) =>
        prevSelected.includes(selectedPrefecture) ?
          prevSelected.filter((pref) => pref.prefCode !== prefCode)
        : [...prevSelected, selectedPrefecture],
      );
    }
  };

  if (isLoading) {
    return <div className={style.title}>Loading...</div>;
  }

  if (isError) {
    return <div className={style.title}>Error loading prefectures.</div>;
  }

  return (
    <div className={style.wrapper}>
      <header className={style.header}>都道府県別人口推移</header>
      <div className={style.container}>
        <PrefectureCheckboxes
          selectedPrefectures={selectedPrefectures}
          onChange={handlePrefectureChange}
          setSelectedPrefectures={setSelectedPrefectures}
        />
        <PopulationChart selectedPrefectures={currentPrefectures} />
      </div>
    </div>
  );
};

export default App;
