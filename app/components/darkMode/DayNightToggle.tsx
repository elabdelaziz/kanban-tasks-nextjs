'use client'

import { useEffect, useState } from 'react'
import styles from '@/app/styles/DayNightToggle.module.css'
import useLocalStorage from '@/app/hooks/useLocalStorage'

const DayNightToggle = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  const onToggle = (isDark: boolean) => {
    setDarkMode(isDark)
  }

  const handleToggle = () => {
    const newIsDark = !darkMode
    onToggle(newIsDark)
  }

  useEffect(() => {
    const htmlElement = document.documentElement
    if (darkMode) {
      htmlElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      htmlElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        checked={darkMode}
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
  )
}
export default DayNightToggle
