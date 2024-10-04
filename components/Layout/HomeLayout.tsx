import React from "react";
import styles from "./HomeLayout.module.css";

export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.page}>
    <div className={styles.container}>{children}</div>
  </div>
);
