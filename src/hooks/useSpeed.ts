import { useEffect, useState } from 'react';

type SpeedMap = {
  currentSpeed: number;
  maxSpeed: number;
  avgSpeed: number;
  hasError: boolean;
  resetMaxSpeed: () => void;
};

const useSpeed = (): SpeedMap => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { speed } = position.coords;
          if (speed) {
            setCurrentSpeed(speed);
            setHasError(false);
          }
        },
        () => {
          // setHasError(true);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    if (maxSpeed < currentSpeed) {
      setMaxSpeed(currentSpeed);
    }
  }, [currentSpeed, maxSpeed]);

  const resetMaxSpeed = () => setMaxSpeed(0);

  return {
    currentSpeed,
    avgSpeed,
    maxSpeed,
    hasError,
    resetMaxSpeed,
  };
};

export default useSpeed;
