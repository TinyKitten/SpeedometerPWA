import React from 'react';
import styles from './styles.module.css';

const Credit: React.FC = () => (
  <footer className={styles.footer}>
    <span>スマートフォン・タブレットで閲覧してください</span>
    <a
      className={styles.link}
      href="https://github.com/TinyKitten/SpeedometerPWA"
      target="_blank"
      rel="noreferrer"
    >
      Fork me on Github
    </a>
  </footer>
);

export default Credit;
