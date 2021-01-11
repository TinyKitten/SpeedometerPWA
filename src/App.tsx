import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Credit from './components/Credit';
import Gauge from './components/Gauge';
import Stats from './components/Stats';

const App: React.FC = () => {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [hasError, setHasError] = useState(false);

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
          setHasError(true);
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

  return (
    <div>
      <Gauge speed={speed} />
      <Stats onResetClick={handleResetClick} maxSpeed={maxSpeed} />
      <Credit />
    </div>
  );
};

export default App;
