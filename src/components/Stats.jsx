import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Stats.module.css'

// Days we have been together — private ✨
const decemberSeventeenth = new Date('2025-12-17')
const today = new Date()
const daysTogether = Math.floor((today - decemberSeventeenth) / (1000 * 60 * 60 * 24))

// Days until birthday (April 24)
const birthdayThisYear = new Date('2026-04-24')
const daysUntilBirthday = Math.ceil((birthdayThisYear - today) / (1000 * 60 * 60 * 24))
const isBirthdayToday = daysUntilBirthday <= 0

const stats = [
  { target: 22,            label: 'Beautiful Years of My Love',    color: '#ff6eb4' },
  { target: daysTogether,  label: 'Days of Pure Happiness Together', color: '#a855f7' },
  { target: isBirthdayToday ? 0 : daysUntilBirthday,
                           label: isBirthdayToday ? '🎉 Today is Her Birthday!' : 'Days Until April 24 🎂',
                           color: '#fbbf24' },
]

function StatCard({ s, index }) {
  const numRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return
    const duration = 2400
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      if (numRef.current) numRef.current.textContent = Math.floor(eased * s.target).toLocaleString()
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, s.target])

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -8 }}
    >
      <span ref={numRef} className={styles.num} style={{ color: s.color }}>0</span>
      <span className={styles.lbl}>{s.label}</span>
    </motion.div>
  )
}

export default function Stats() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.h2
          ref={titleRef}
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          🎂 My Love&apos;s Big Numbers
        </motion.h2>
        <div className={styles.row}>
          {stats.map((s, i) => <StatCard key={s.label} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
