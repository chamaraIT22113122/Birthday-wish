import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Reasons.module.css';

const reasonsList = [
  { front: '1', back: 'Your infectious smile that lights up any room 😊' },
  { front: '2', back: 'How you care so deeply for everything and everyone 💖' },
  { front: '3', back: 'The comfort of just being by your side 🛋️' },
  { front: '4', back: 'Your beautiful eyes that I get lost in 👀' },
  { front: '5', back: 'The way you laugh at my silly jokes 😂' },
  { front: '6', back: 'Your ambition and how hard you work 🌟' },
  { front: '7', back: 'How you always know how to make me feel better 🤗' },
  { front: '8', back: 'The cute way you get sleepy 😴' },
  { front: '9', back: 'Your resilience and strength 🛡️' },
  { front: '10', back: 'Just being you — perfectly imperfect to me 💝' },
];

function FlipCard({ item, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className={styles.cardInner}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className={styles.cardFront}>
          <span className={styles.cardNumber}>Reason #{item.front}</span>
          <span className={styles.tapText}>(Tap to reveal)</span>
        </div>
        <div className={styles.cardBack}>
          <p>{item.back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Reasons() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          10 Reasons I Love You 🌹
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {reasonsList.map((item, i) => (
          <FlipCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
