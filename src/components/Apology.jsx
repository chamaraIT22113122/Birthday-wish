import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Apology.module.css'

const paragraphs = [
  {
    icon: '💔',
    title: 'I Am So Sorry…',
    text: `I know that words alone can never fully erase the pain I have caused you. But I want you to know — with every piece of my heart — that I am truly, deeply sorry for everything I have done that hurt you. <bad>There were moments where I chose the wrong path, said the wrong things, and failed to be the person you needed me to be.</bad> For all of that, I am genuinely sorry.`,
  },
  {
    icon: '🙏',
    title: 'For All My Mistakes…',
    text: `I am sorry for the times <bad>I was careless with your feelings</bad>. I am sorry for the moments <bad>I made you feel unheard, unimportant, or unloved</bad>. I am sorry for <bad>the promises I could not keep</bad>, and for <bad>the hurt I caused without even realizing it</bad>. You deserved so much better from me, and I wish I had been wiser, kinder, and more thoughtful.`,
  },
  {
    icon: '🌧️',
    title: 'For the Dark Days…',
    text: `I am sorry for <bad>the storms I brought into your life</bad> when all you ever did was try to bring sunshine into mine. I know there were days when <bad>my actions made everything harder for you</bad>. <bad>You carried so much heavy weight because of me</bad>, and you never deserved that. I see it now more clearly than I ever did before.`,
  },
  {
    icon: '🌹',
    title: 'What You Mean to Me…',
    text: `But here is what I also know — I cannot stay without you. You are not just a part of my life; you are the very reason I want to be a better person. When I think of a future, I see you in it. When I feel lost, you are the light I search for. I am not complete without you. I never have been. And I never will be.`,
  },
  {
    icon: '💫',
    title: 'A Promise From My Heart…',
    text: `On your birthday — a day meant to celebrate how wonderful and irreplaceable you are — I want to make you a promise. Not just with words, but with everything that I am. I promise to try harder every single day. I promise to listen more, to love louder, and to never take for granted the gift that you are in my life. You are my everything, and I am sorry it took me so long to show you that properly.`,
  },
  {
    icon: '🌟',
    title: 'I Love You…',
    text: `I love you more than I know how to say. I love you on the days when it's easy, and I love you on the days when I fail. I love you through every mistake, every apology, and every chance you have given me. Please know that I hold those chances sacred. Happy Birthday — you deserve a love that matches the enormity of who you are. I hope to give you just that, every day from this one forward.`,
  },
]

function renderText(text) {
  // simple parser to convert <bad>...</bad> into a stylized span component
  const parts = text.split(/(<bad>.*?<\/bad>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('<bad>') && part.endsWith('</bad>')) {
      const innerText = part.replace('<bad>', '').replace('</bad>', '');
      return <span key={i} className={styles.badActionHighlight}>{innerText}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ApologyCard({ para, index }) {
  const [open, setOpen] = useState(index === 0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 80 }}
    >
      <button className={styles.header} onClick={() => setOpen(o => !o)}>
        <span className={styles.headerLeft}>
          <motion.span
            className={styles.cardIcon}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          >
            {para.icon}
          </motion.span>
          <span className={styles.cardTitle}>{para.title}</span>
        </span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className={styles.text}>{renderText(para.text)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Apology({ burstRef }) {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className={styles.section}>
      {/* Decorative rings */}
      {[200, 350, 500].map((size, i) => (
        <motion.div
          key={size}
          className={styles.ring}
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 1.5 }}
        />
      ))}

      <div className={styles.inner}>
        {/* Title */}
        <motion.div
          ref={titleRef}
          className={styles.titleWrap}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className={styles.bigHeart}
            animate={{ scale: [1, 1.18, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            onClick={() => burstRef?.current?.(window.innerWidth / 2, window.innerHeight / 2, 60)}
            style={{ cursor: 'pointer' }}
          >
            💖
          </motion.div>
          <h2 className={styles.title}>From the Bottom of My Heart</h2>
          <p className={styles.subtitle}>
            Today is your day, My Heart — and while the world celebrates you,
            I want to take this moment to say the things I should have said long ago.
          </p>
        </motion.div>

        {/* Accordion cards */}
        <div className={styles.cards}>
          {paragraphs.map((p, i) => (
            <ApologyCard key={p.title} para={p} index={i} />
          ))}
        </div>

        {/* Closing quote */}
        <motion.div
          className={styles.closing}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <motion.div
            className={styles.closingHeart}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            💝
          </motion.div>
          <blockquote className={styles.quote}>
            &ldquo;I cannot stay without you, My Love.<br />
            You are my calm, my chaos, and my home.<br />
            <strong>Happy 22nd Birthday, my everything. 🌹</strong>&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
