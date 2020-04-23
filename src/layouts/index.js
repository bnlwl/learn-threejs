import React from 'react';
import styles from './index.less';

export default ({ children }) => {
  return (
    <div>
      <h1 className={styles.title}>Layout</h1>
      {children}
    </div>
  );
};
