import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MoodRing.module.css';

const MOODS = [
  { color: '#fbbf24', text: 'Joyful & Golden ✨', glow: 'rgba(251,191,36,0.6)' },
  { color: '#ff6eb4', text: 'Deeply in Love 💖', glow: 'rgba(255,110,180,0.6)' },
  { color: '#a855f7', text: 'Magical & Dreamy 🌌', glow: 'rgba(168,85,247,0.6)' },
  { color: '#38bdf8', text: 'Calm & Peaceful 🌊', glow: 'rgba(56,189,248,0.6)' }
];

export default function MoodRing() {
  const [moodIndex, setMoodIndex] = useState(0);

  const currentMood = MOODS[moodIndex];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>💍 Your Mood Ring</h2>
      <p className={styles.subtitle}>Hover or tap to reveal your vibe today</p>
      
      <div 
        className={styles.ringWrapper}
        onMouseEnter={() => setMoodIndex((prev) => (prev + 1) % MOODS.length)}
        onClick={() => setMoodIndex((prev) => (prev + 1) % MOODS.length)}
      >
        <motion.div 
          className={styles.stone}
          animate={{ 
            backgroundColor: currentMood.color,
            boxShadow: `0 0 30px ${currentMood.glow}, inset 0 0 15px rgba(255,255,255,0.5)`
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <div className={styles.band}></div>
      </div>
      
      <motion.p 
        key={currentMood.text}
        className={styles.moodText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: currentMood.color }}
      >
        {currentMood.text}
      </motion.p>
    </section>
  );
}
