import React from 'react';
import styles from './TwoColumnLayout.module.css';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className={styles.twoColumnLayout}>
      <div className={styles.column}>{left}</div>
      <div className={styles.column}>{right}</div>
    </div>
  );
}
