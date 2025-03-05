'use client';

import { useState } from "react";
import styles from "@/app/styles/DayNightToggle.module.css";

interface ThemeSwitchProps {
  isDark: boolean;
  // onToggle: (isDark: boolean) => void;
}

const DayNightToggle = ({ isDark }: ThemeSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isDark);

  const handleToggle = () => {
    const newIsDark = !isChecked;
    setIsChecked(newIsDark);
    // onToggle(newIsDark);
  };
  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className={styles.dn}
        id="dn"
      />
      <label htmlFor="dn" className={styles.toggle}>
        <span className={styles.toggle__handler}>
          <span className={`${styles.crater} ${styles.crater1}`}></span>
          <span className={`${styles.crater} ${styles.crater2}`}></span>
          <span className={`${styles.crater} ${styles.crater3}`}></span>
        </span>
        <span className={`${styles.star} ${styles.star1}`}></span>
        <span className={`${styles.star} ${styles.star2}`}></span>
        <span className={`${styles.star} ${styles.star3}`}></span>
        <span className={`${styles.star} ${styles.star7}`}></span>
        <span className={`${styles.star} ${styles.star8}`}></span>
        <span className={`${styles.star} ${styles.star9}`}></span>
      </label>
    </div>
  );
};
export default DayNightToggle;
