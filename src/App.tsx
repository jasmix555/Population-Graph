import style from './App.module.css';
import { PrefectureCheckboxes } from './components/PrefectureCheckbox';

const App = () => {
  return (
    <div className={style.wrapper}>
      <h1>Population Graph</h1>
      <PrefectureCheckboxes />
    </div>
  );
};

export default App;
