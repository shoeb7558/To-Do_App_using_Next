// components/Layout.js

import React from 'react';
import Head from 'next/head';
import styles from './Home.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Todo List App</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer content here</footer>
    </div>
  );
};

export default Layout;
