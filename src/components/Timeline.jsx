import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Timeline.module.css';

const events = [
  { date: 'December 17', title: 'The Day Everything Changed 💫', desc: 'The beautiful beginning of our story together.' },
  { date: 'Our First Adventure', title: 'Making Memories 🌊', desc: 'The first of many unforgettable trips by your side.' },
  { date: 'Late Night Talks', title: 'Moonlit Conversations 🌙', desc: 'Losing track of time just listening to your voice.' },
  { date: 'Today', title: 'Celebrating You 🎂', desc: 'Celebrating my favourite person in the entire world.' },
];

function TimelineItem({ event, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  
  return (
    <div className={styles.item} ref={ref}>
      <motion.div 
        className={styles.dot}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', delay: 0.2 }}
      ></motion.div>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className={styles.date}>{event.date}</span>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.desc}>{event.desc}</p>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>The Story of Us 📖</h2>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
