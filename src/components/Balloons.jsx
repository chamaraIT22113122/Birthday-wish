import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Balloons.module.css'

const wishes = [
  { label: 'Health 💚',    color: ['#34d399','#059669'] },
  { label: 'Happiness 😊', color: ['#fbbf24','#d97706'] },
  { label: 'Love 💖',      color: ['#ff6eb4','#e91e8c'] },
  { label: 'Success 🌟',   color: ['#38bdf8','#0284c7'] },
  { label: 'Adventure 🌍', color: ['#a855f7','#6d28d9'] },
  { label: 'Peace 🕊️',    color: ['#f472b6','#db2777'] },
  { label: 'Joy 🎉',       color: ['#60a5fa','#2563eb'] },
  { label: 'Dreams ✨',     color: ['#fb7185','#e11d48'] },
]

function Balloon({ wish, index, onPop, burstRef }) {
  const [popped, setPopped] = useState(false)
  const grad = `linear-gradient(135deg, ${wish.color[0]}, ${wish.color[1]})`

  const handlePop = (e) => {
    if (popped) return
    setPopped(true)
    burstRef?.current?.(e.clientX, e.clientY, 30)
    setTimeout(() => onPop(index), 450)
  }

  return (
    <AnimatePresence>
      {!popped && (
        <motion.div
          className={styles.wrap}
          style={{ '--sway': `${2.5 + (index % 3) * 0.7}s` }}
          animate={{ rotate: [-5, 5], y: [0, -10, 0] }}
          transition={{ duration: 2.5 + index * 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          exit={{ scale: [1, 1.5, 0], opacity: [1, 0.6, 0], transition: { duration: 0.4 } }}
          onClick={handlePop}
          whileHover={{ filter: 'brightness(1.25)', scale: 1.08 }}
        >
          <div className={styles.body} style={{ background: grad }}>
            <div className={styles.shine} />
            <span className={styles.wishLabel}>{wish.label}</span>
          </div>
          <div className={styles.knot} style={{ background: wish.color[1] }} />
          <div className={styles.string} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Balloons({ burstRef }) {
  const [alive, setAlive] = useState(wishes.map((_, i) => i))
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const handlePop = (i) => setAlive(prev => prev.filter(x => x !== i))

  return (
    <section className={styles.section}>
      <motion.h2
        ref={titleRef}
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        🎈 Pop a Balloon for a Wish!
      </motion.h2>
      <p className={styles.sub}>Click any balloon to reveal a special wish 🌟</p>

      <div className={styles.container}>
        {alive.length === 0 ? (
          <motion.div
            className={styles.allPopped}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            <span style={{ fontSize: '3rem' }}>🎊</span>
            <p>All wishes released into the universe!<br />May they all come true for you 💫</p>
          </motion.div>
        ) : (
          wishes.map((w, i) =>
            alive.includes(i) && (
              <Balloon key={i} wish={w} index={i} onPop={handlePop} burstRef={burstRef} />
            )
          )
        )}
      </div>
    </section>
  )
}
