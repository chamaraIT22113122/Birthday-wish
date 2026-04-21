import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.5;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            // Remove listeners once it successfully plays
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
          }).catch(error => {
            console.log("Auto-play still blocked.");
          });
        }
      }
    };

    // Attach listeners to trigger audio on absolutely any interaction
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation(); // prevent bubbling to the window click handler
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        // Traditional Happy Birthday Instrumental
        src="https://ia800508.us.archive.org/5/items/HappyBirthdayToYou_618/Happy_Birthday_To_You_Instrumental.mp3" 
      />
      <motion.button 
        className={styles.playButton}
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </motion.button>
      
      {/* Floating music notes when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div className={styles.notesContainer}>
             {[1, 2, 3].map(i => (
               <motion.span
                 key={i}
                 className={styles.note}
                 initial={{ opacity: 0, y: 0, x: 0 }}
                 animate={{ 
                   opacity: [0, 1, 0], 
                   y: [-10, -50], 
                   x: [0, i % 2 === 0 ? 20 : -20]
                 }}
                 transition={{ 
                   duration: 2, 
                   repeat: Infinity, 
                   delay: i * 0.6,
                   ease: "easeOut"
                 }}
               >
                 🎵
               </motion.span>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
