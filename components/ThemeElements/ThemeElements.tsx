import React from "react";
import styles from "./ThemeElements.module.css";

export default function ThemeElements() {
  return (
    <div className={styles.themeElements}>
      <div className={styles.bonsai}></div>
      <div className={styles.tophat}></div>
      <div className={styles.pepe}></div>
      <div className={styles.hippo}></div>
    </div>
  );
}
