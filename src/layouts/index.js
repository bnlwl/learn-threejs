import React from 'react';
import { NavLink } from 'umi';
import styles from './index.less';

const Layout = ({ children, route }) => {
  const { routes = [] } = route;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>What?</h1>
      <div className={styles.menu}>
        <ul>
          {routes.map(t => (
            <li key={t.path}>
              <NavLink to={t.path}>{t.name}</NavLink>
            </li>
          ))}
        </ul>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
