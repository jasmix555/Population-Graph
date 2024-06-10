import style from './App.module.css';
import { PopulationChart } from './components/PopulationChart';
import { PrefectureCheckboxes } from './components/PrefectureCheckbox';

const App = () => {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>都道府県別人口推移</header>
      <PrefectureCheckboxes />
      <PopulationChart selectedPrefectures={[]} />
    </div>
  );
};

export default App;
