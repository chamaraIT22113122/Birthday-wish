import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Gallery.module.css'

// Import all 10 photos
import p1 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.34 AM.jpeg'
import p2 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.35 AM.jpeg'
import p3 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.36 AM (1).jpeg'
import p4 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.36 AM.jpeg'
import p5 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.37 AM (1).jpeg'
import p6 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.37 AM (2).jpeg'
import p7 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.37 AM.jpeg'
import p8 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.38 AM (1).jpeg'
import p9 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.36.38 AM.jpeg'
import p10 from '../assets/imagers/WhatsApp Image 2026-04-21 at 8.38.08 AM.jpeg'
import p11 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.26.02 AM.jpeg'
import p12 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.26.03 AM.jpeg'
import p13 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.26.04 AM.jpeg'
import p14 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.32.21 AM.jpeg'
import p15 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.35.16 AM.jpeg'
import p16 from '../assets/imagers/WhatsApp Image 2026-04-23 at 11.35.17 AM.jpeg'

const photos = [
  { src: p1,  caption: 'Adventures together 🌿',        rotate: -3 },
  { src: p2,  caption: 'Moonlit evenings 🌊',            rotate: 2  },
  { src: p3,  caption: 'Our story begins 💖',            rotate: -2 },
  { src: p4,  caption: 'Smiles that say everything ✨',  rotate: 4  },
  { src: p5,  caption: 'Every moment counts 🌸',         rotate: -4 },
  { src: p6,  caption: 'Hold on tight 🎀',               rotate: 3  },
  { src: p7,  caption: 'Making memories 🌺',             rotate: -2 },
  { src: p8,  caption: 'You & me, always 💫',            rotate: 2  },
  { src: p9,  caption: 'Sun-kissed days 🌞',             rotate: -3 },
  { src: p10, caption: 'Forever in my heart 💝',         rotate: 1  },
  { src: p11, caption: 'Every smile with you 😊',         rotate: -2 },
  { src: p12, caption: 'A beautiful journey 🌹',         rotate: 3  },
  { src: p13, caption: 'Cherished moments 🕊️',           rotate: -4 },
  { src: p14, caption: 'Together is a beautiful place ❤️', rotate: 2 },
  { src: p15, caption: 'Endless laughter 🌻',            rotate: -3 },
  { src: p16, caption: 'You make me complete 💍',        rotate: 1  },
]

function Polaroid({ photo, index }) {
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={styles.polaroid}
      style={{ '--r': `${photo.rotate}deg` }}
      initial={{ opacity: 0, y: 60, rotate: photo.rotate }}
      animate={inView ? { opacity: 1, y: 0, rotate: photo.rotate } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, type: 'spring', stiffness: 80 }}
      whileHover={{ rotate: 0, scale: 1.07, y: -14, zIndex: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className={styles.imgWrap}>
        <img src={photo.src} alt={photo.caption} className={styles.img} />
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
        >
          <span>❤️</span>
        </motion.div>
      </div>
      <p className={styles.caption}>{photo.caption}</p>
    </motion.div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className={styles.section}>
      <motion.div
        ref={titleRef}
        className={styles.titleWrap}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.title}>📸 Our Memories</h2>
        <p className={styles.sub}>
          Every photo tells a story of us — a love worth every moment 💕
        </p>
      </motion.div>

      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <div key={i} onClick={() => setLightbox(i)} style={{ cursor: 'zoom-in' }}>
            <Polaroid photo={photo} index={i} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                className={styles.lightboxImg}
              />
              <p className={styles.lightboxCaption}>{photos[lightbox].caption}</p>
              <div className={styles.lbNav}>
                <button
                  onClick={() => setLightbox(i => (i - 1 + photos.length) % photos.length)}
                >‹</button>
                <span>{lightbox + 1} / {photos.length}</span>
                <button
                  onClick={() => setLightbox(i => (i + 1) % photos.length)}
                >›</button>
              </div>
              <button className={styles.lbClose} onClick={() => setLightbox(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
