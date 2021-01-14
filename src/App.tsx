import React, { useCallback, useEffect, useState } from 'react';
import Credit from './components/Credit';
import Gauge from './components/Gauge';
import Stats from './components/Stats';
import styles from './App.module.css';

const App: React.FC = () => {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [hasError, setHasError] = useState(false);

  const toKMH = useCallback(
    (num: number) => Math.round((num * 3600) / 1000),
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const speed = position.coords.speed || 0;
          setSpeed(speed);
          if (maxSpeed < speed) {
            setMaxSpeed(speed);
          }
          setHasError(false);
        },
        () => {
          // setHasError(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
        }
      );
    } else {
      setHasError(true);
    }
  }, [maxSpeed]);

  const handleResetClick = useCallback(() => {
    setMaxSpeed(0);
  }, []);

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorMsg}>位置情報の取得に失敗しました</h1>
      </div>
    );
  }

  return (
    <div>
      <Gauge speed={toKMH(speed)} />
      <Stats onResetClick={handleResetClick} maxSpeed={toKMH(maxSpeed)} />
      <Credit />
    </div>
  );
};

export default App;
