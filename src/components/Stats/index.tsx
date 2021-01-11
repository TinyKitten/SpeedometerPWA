import React from 'react';
import styles from './styles.module.css';

type Props = {
  maxSpeed: number;
  onResetClick: () => void;
};

const Stats: React.FC<Props> = ({ maxSpeed, onResetClick }: Props) => {
  return (
    <section className={styles.statics}>
      <div className={styles.panel}>
        <h3 className={styles.title}>MAX SPEED</h3>
        <div className={styles.speedContainer}>
          <p className={styles.speed}>{maxSpeed}</p>
          <p className={styles.unit}>km/h</p>
        </div>
      </div>
      <button onClick={onResetClick} className={styles.resetbtn}>
        RESET
      </button>
    </section>
  );
};

export default Stats;
