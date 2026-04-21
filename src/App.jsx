import { useRef } from 'react'
import ConfettiCanvas from './components/ConfettiCanvas'
import FloatingEmojis from './components/FloatingEmojis'
import StarField      from './components/StarField'
import Hero           from './components/Hero'
import Cards          from './components/Cards'
import Balloons       from './components/Balloons'
import Stats          from './components/Stats'
import Gallery        from './components/Gallery'
import LoveLetter     from './components/LoveLetter'
import Reasons        from './components/Reasons'
import Timeline       from './components/Timeline'
import Apology        from './components/Apology'
import Finale         from './components/Finale'
import AudioPlayer    from './components/AudioPlayer'

export default function App() {
  const burstRef = useRef(null)

  const handleGlobalClick = (e) => {
    // Fire confetti at click position
    if (burstRef.current) {
      burstRef.current(e.clientX, e.clientY, 15);
    }
  };

  return (
    <div onClick={handleGlobalClick} style={{ minHeight: '100vh', touchAction: 'manipulation' }}>
      {/* Fixed background layers */}
      <ConfettiCanvas burstRef={burstRef} />
      <StarField />
      <FloatingEmojis />
      <AudioPlayer />

      {/* Page content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero    burstRef={burstRef} />
        <Cards   />
        <Balloons burstRef={burstRef} />
        <Stats   />
        <Gallery />
        <Timeline />
        <Reasons />
        <LoveLetter />
        <Apology burstRef={burstRef} />
        <Finale  burstRef={burstRef} />
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '28px',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.82rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 1,
      }}>
        Made with 💖 — just for you &nbsp;|&nbsp; 2026
      </footer>
    </div>
  )
}
