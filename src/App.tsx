import React, { useEffect, useState } from 'react';
import { Snackbar, Button } from '@material-ui/core';
import Credit from './components/Credit';
import Gauge from './components/Gauge';
import Stats from './components/Stats';
import styles from './App.module.css';
import useSpeed from './hooks/useSpeed';
import { toKMH } from './utils/kmh';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const App: React.FC = () => {
  const { currentSpeed, maxSpeed, hasError, resetMaxSpeed } = useSpeed();
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  const handleSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: handleSWUpdate });
  });

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorMsg}>位置情報の取得に失敗しました</h1>
      </div>
    );
  }

  return (
    <div>
      <Snackbar
        open={showReload}
        message="新しいバージョンがリリースされました🚀"
        onClick={reloadPage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <Button color="inherit" size="small" onClick={reloadPage}>
            リロード
          </Button>
        }
      />

      <Gauge speed={toKMH(currentSpeed)} />
      <Stats onResetClick={resetMaxSpeed} maxSpeed={toKMH(maxSpeed)} />
      <Credit />
    </div>
  );
};

export default App;
