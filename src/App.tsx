import React from 'react';
import Credit from './components/Credit';
import Gauge from './components/Gauge';
import Stats from './components/Stats';
import styles from './App.module.css';
import useSpeed from './hooks/useSpeed';
import { toKMH } from './utils/kmh';

const App: React.FC = () => {
  const { currentSpeed, maxSpeed, hasError, resetMaxSpeed } = useSpeed();

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorMsg}>位置情報の取得に失敗しました</h1>
      </div>
    );
  }

  return (
    <div>
      <Gauge speed={toKMH(currentSpeed)} />
      <Stats onResetClick={resetMaxSpeed} maxSpeed={toKMH(maxSpeed)} />
      <Credit />
    </div>
  );
};

export default App;
