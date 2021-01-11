import React, { useMemo } from 'react';
import styles from './styles.module.css';

type Props = {
  speed: number;
};

const Gauge: React.FC<Props> = ({ speed }: Props) => {
  const circleColorClassName = useMemo(() => {
    if (speed === 0) {
      return styles.circle;
    } else if (speed < 30) {
      return [styles.circle, styles.green].join(' ');
    } else if (speed < 60) {
      return [styles.circle, styles.yellow].join(' ');
    }
    return [styles.circle, styles.red].join(' ');
  }, [speed]);

  return (
    <div className={styles.gauge}>
      <div className={circleColorClassName}>
        <div className={styles.text}>
          <span className={styles.speed}>{speed}</span>
          <span className={styles.unit}>km/h</span>
        </div>
      </div>
    </div>
  );
};

export default Gauge;
