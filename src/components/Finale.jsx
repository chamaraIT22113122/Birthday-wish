import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Finale.module.css'

const emojis = ['🎉','🎊','🎈','✨','🌸','💫','🎂','🌹','💖','🦋','⭐','🎀']

export default function Finale({ burstRef }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className={styles.section}>
      {/* Orbital rings */}
      {[280, 460, 640].map((size, i) => (
        <motion.div
          key={size}
          className={styles.ring}
          style={{ width: size, height: size }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <motion.div
        ref={ref}
        className={styles.content}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, type: 'spring', stiffness: 90 }}
      >
        <motion.div
          className={styles.heart}
          animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          onClick={() => {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                burstRef?.current?.(
                  window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                  window.innerHeight / 2,
                  30
                )
              }, i * 120)
            }
          }}
          style={{ cursor: 'pointer' }}
          title="Click for magic! ✨"
        >
          💖
        </motion.div>

        <motion.h2 className={styles.subtitle}>Happy Birthday,</motion.h2>
        <motion.h1 className={styles.name}>My Everything! 🌟</motion.h1>

        <motion.p className={styles.text}>
          May every dream you&apos;ve whispered to the stars come true.<br />
          May every moment overflow with laughter and golden light.<br />
          <strong>Happy 22nd, My Love — you deserve the entire world. 💝</strong>
        </motion.p>

        <div className={styles.emojiRow}>
          {emojis.map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ rotate: i % 2 === 0 ? [0, 360] : [0, -360], scale: [1, 1.15, 1] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'linear' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
