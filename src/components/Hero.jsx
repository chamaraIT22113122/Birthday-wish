import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

const Flame = ({ blown }) => (
  <motion.div
    className={styles.flame}
    animate={blown ? { scaleY: 0, opacity: 0 } : { scaleY: [1, 1.1, 0.9, 1.05, 1], scaleX: [1, 0.85, 1.1, 0.9, 1] }}
    transition={blown ? { duration: 0.4 } : { duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
  />
)

const Candle = ({ blown, delay }) => (
  <motion.div
    className={styles.candle}
    animate={blown ? { background: 'linear-gradient(to bottom, #666, #444)', boxShadow: 'none' } : {}}
    transition={{ delay }}
  >
    <Flame blown={blown} />
    <motion.div
      className={styles.smokeWrap}
      initial={{ opacity: 0 }}
      animate={blown ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: delay + 0.3 }}
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className={styles.smoke}
          style={{ left: `${i * 5 - 4}px`, animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </motion.div>
  </motion.div>
)

export default function Hero({ burstRef }) {
  const [blown, setBlown] = useState(false)
  const [overlay, setOverlay] = useState(false)

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    // Trigger confetti burst
    setTimeout(() => {
      if (burstRef?.current) {
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            burstRef.current(
              window.innerWidth / 2 + (Math.random() - 0.5) * 300,
              window.innerHeight / 3,
              35
            )
          }, i * 150)
        }
      }
    }, 900)
    setTimeout(() => setOverlay(true), 1400)
  }

  return (
    <section className={styles.hero}>
      {/* Ambient glow */}
      <motion.div
        className={styles.glow}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Cake */}
      <motion.div
        className={styles.cakeWrap}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={(e) => burstRef?.current?.(e.clientX, e.clientY, 40)}
        style={{ cursor: 'pointer' }}
        title="Click the cake for confetti! 🎉"
      >
        {/* Candles */}
        <div className={styles.candlesRow}>
          {[0, 1, 2].map(i => <Candle key={i} blown={blown} delay={i * 0.35} />)}
        </div>

        {/* Cake layers */}
        <motion.div
          className={styles.top}
          whileHover={{ scale: 1.03 }}
        >
          <div className={styles.drip} />
          <span>🌹</span><span>🌸</span><span>🌼</span>
        </motion.div>
        <div className={styles.mid} />
        <div className={styles.bot}>
          <span className={styles.botText}>🎉 Happy Birthday! 🎉</span>
        </div>
        <div className={styles.plate} />
        <div className={styles.plateShadow} />
      </motion.div>

      {/* Text */}
      <motion.div
        className={styles.textBlock}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <motion.p
          className={styles.subtop}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ✨ Wishing you the most magical day, My Love ✨
        </motion.p>

        <motion.h1
          className={styles.mainTitle}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
        >
          Happy Birthday!
        </motion.h1>

        <motion.p
          className={styles.herName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          — Happy 22nd Birthday, My Darling 🌸 —
        </motion.p>

        <motion.p className={styles.tagline}>
          You are my favourite chapter in the story of my life 💫
        </motion.p>

        <motion.button
          className={styles.blowBtn}
          onClick={handleBlow}
          disabled={blown}
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.96 }}
          animate={blown ? {} : {
            boxShadow: [
              '0 8px 30px rgba(168,85,247,0.4)',
              '0 12px 50px rgba(255,110,180,0.6)',
              '0 8px 30px rgba(168,85,247,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {blown ? '🕯️ Candles Blown!' : '🌬️ Blow the Candles!'}
        </motion.button>
      </motion.div>

      {/* Wish overlay */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.overlayCard}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.span
                style={{ fontSize: '4.5rem', display: 'block', marginBottom: 16 }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >🎉</motion.span>
              <h2>Make a Wish!</h2>
              <p>Your wish has been sent to the stars ⭐</p>
              <button onClick={() => setOverlay(false)}>Close ✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
