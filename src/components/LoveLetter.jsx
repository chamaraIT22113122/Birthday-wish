import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './LoveLetter.module.css';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Typewriter effect 
  const text = `My Darling,\n\nI want to take a moment to tell you just how incredibly beautiful and special you are. Watching you grow, smile, and conquer everything you set your mind to makes me the proudest person alive. \n\nNo matter what challenges come our way, I'll be right here holding your hand. Happy 22nd Birthday! May your day be as radiant as your heart. \n\nForever Yours 💖`;
  const [displayedText, setDisplayedText] = useState("");

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Typing speed
    }
  };

  return (
    <section className={styles.section} ref={ref}>
      <motion.div
        className={styles.container}
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>💌 A Letter For You</h2>
        <p className={styles.subtitle}>Tap the envelope to open</p>

        <div className={styles.envelopeWrapper} onClick={handleOpen}>
          <motion.div 
            className={`${styles.envelope} ${isOpen ? styles.open : ''}`}
            animate={{ 
              rotate: isOpen ? 0 : [-2, 2, -2],
              scale: isOpen ? 1.05 : 1
            }}
            transition={{
              rotate: { repeat: isOpen ? 0 : Infinity, duration: 2, ease: "linear" },
              scale: { duration: 0.4 }
            }}
          >
            <div className={styles.flap}></div>
            <div className={styles.body}></div>
            <div className={styles.seal}>💖</div>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  className={styles.paper}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -100, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing
                >
                  <p className={styles.letterText}>
                    {displayedText}
                    <motion.span 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      |
                    </motion.span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
