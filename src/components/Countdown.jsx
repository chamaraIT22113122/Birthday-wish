import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Countdown.module.css';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: April 24 of the current year (or next year if already passed)
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(`${targetYear}-04-24T00:00:00`);
    
    if (now > targetDate) {
      targetDate = new Date(`${targetYear + 1}-04-24T00:00:00`);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={styles.container}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3 className={styles.title}>⏳ Countdown to April 24</h3>
      <div className={styles.timer}>
        <div className={styles.box}>
          <span className={styles.num}>{timeLeft.days}</span>
          <span className={styles.label}>Days</span>
        </div>
        <div className={styles.box}>
          <span className={styles.num}>{timeLeft.hours}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <div className={styles.box}>
          <span className={styles.num}>{timeLeft.minutes}</span>
          <span className={styles.label}>Mins</span>
        </div>
        <div className={styles.box}>
          <span className={styles.num}>{timeLeft.seconds}</span>
          <span className={styles.label}>Secs</span>
        </div>
      </div>
    </motion.div>
  );
}
