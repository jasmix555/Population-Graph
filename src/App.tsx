import style from './App.module.css';
import { PrefectureCheckboxes } from './components/PrefectureCheckbox';

const App = () => {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>都道府県別人口推移</header>
      <PrefectureCheckboxes />
    </div>
  );
};

export default App;
