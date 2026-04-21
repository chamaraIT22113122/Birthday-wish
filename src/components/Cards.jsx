import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Cards.module.css'

const cards = [
  { icon: '🌸', title: 'You Are Loved', color: 'pink',
    text: 'On this beautiful day, know that you are cherished beyond words. Your smile lights up every room — and my world.' },
  { icon: '✨', title: 'You Are Magic', color: 'purple',
    text: 'There\'s something truly magical about you — the way you care, the way you shine. Never stop being exactly who you are.' },
  { icon: '🦋', title: 'You Are Strong', color: 'blue',
    text: 'Through every challenge, you rise like a butterfly. This year, may you soar higher and brighter than ever before.' },
  { icon: '👑', title: 'You Are A Queen', color: 'gold',
    text: 'Today is YOUR day. Let the world celebrate the incredible, unstoppable, radiant queen that you truly are.' },
]

function Card({ card, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${styles[card.color]}`}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -12, scale: 1.04 }}
    >
      <motion.div
        className={styles.icon}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
      >
        {card.icon}
      </motion.div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </motion.div>
  )
}

export default function Cards() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={styles.section}>
      <motion.h2
        ref={ref}
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        💌 Birthday Letters
      </motion.h2>
      <div className={styles.grid}>
        {cards.map((c, i) => <Card key={c.title} card={c} index={i} />)}
      </div>
    </section>
  )
}
