import React from 'react';
import styles from './styles.module.css';
import MaxSpeedIcon from '../../assets/icons/jet.png';
// import AverageSpeedIcon from '../../assets/icons/chart1.png';

type Props = {
  maxSpeed: number;
  // avgSpeed: number;
  onResetClick: () => void;
};

const Stats: React.FC<Props> = ({
  maxSpeed,
  // avgSpeed,
  onResetClick,
}: Props) => {
  return (
    <section className={styles.statics}>
      <div className={styles.panels}>
        <div className={styles.panel}>
          <img className={styles.icon} src={MaxSpeedIcon} />
          <h3 className={styles.title}>Max speed</h3>
          <p className={styles.speed}>{maxSpeed}km/h</p>
        </div>
        {/* <div className={styles.panel}>
          <img className={styles.icon} src={AverageSpeedIcon} />
          <h3 className={styles.title}>Average speed</h3>
          <p className={styles.speed}>{maxSpeed}km/h</p>
        </div> */}
      </div>
      <button onClick={onResetClick} className={styles.resetbtn}>
        RESET
      </button>
    </section>
  );
};

export default Stats;
