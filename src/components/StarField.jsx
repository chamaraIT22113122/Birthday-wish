import { useEffect, useRef } from 'react'

export default function StarField() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const elementsToCleanup = []
    
    // Background twinkling stars
    for (let i = 0; i < 130; i++) {
      const s = document.createElement('div')
      const size  = Math.random() * 2.5 + 0.5
      const dur   = (Math.random() * 4 + 2).toFixed(1)
      const op    = (Math.random() * 0.6 + 0.2).toFixed(2)
      const delay = (Math.random() * 6).toFixed(1)
      s.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        border-radius:50%; background:white;
        top:${Math.random()*100}%; left:${Math.random()*100}%;
        animation: twinkle ${dur}s ease-in-out ${delay}s infinite alternate;
        opacity:0;
        --op:${op};
      `
      container.appendChild(s)
      elementsToCleanup.push(s)
    }

    // Shooting stars
    const shootStar = () => {
      const s = document.createElement('div')
      const size = Math.random() * 2 + 1;
      s.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        border-radius:50%; background:white;
        top:${(Math.random() * 60)}%; left:-10%;
        box-shadow: 0 0 ${size * 2}px white, 0 0 ${size * 4}px rgba(255,110,180,0.8);
        animation: shooting-star 2s linear forwards;
        z-index: 10;
      `
      
      const tail = document.createElement('div')
      tail.style.cssText = `
        position:absolute;
        top:50%; right:100%;
        width: 150px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8));
        transform: translateY(-50%);
      `
      s.appendChild(tail)
      
      container.appendChild(s)
      elementsToCleanup.push(s)
      
      // Clean up after animation
      setTimeout(() => {
        if (container.contains(s)) {
          s.remove()
          const index = elementsToCleanup.indexOf(s)
          if (index > -1) elementsToCleanup.splice(index, 1)
        }
      }, 2000)
    }

    // Shoot a star periodically
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance to shoot every 3 seconds
        shootStar()
      }
    }, 3000)

    return () => {
      clearInterval(shootInterval)
      elementsToCleanup.forEach(s => {
        if (s && s.parentNode) s.remove()
      })
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%   { opacity:0;       transform:scale(0.5); }
          100% { opacity:var(--op); transform:scale(1.3); }
        }
        @keyframes shooting-star {
          0% {
            transform: translate(0, 0) rotate(15deg) scale(0);
            opacity: 1;
          }
          10% {
            transform: translate(10vw, 3vh) rotate(15deg) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(120vw, 36vh) rotate(15deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={ref}
        style={{
          position:'fixed', top:0, left:0,
          width:'100%', height:'100%',
          pointerEvents:'none', zIndex:0,
          overflow: 'hidden'
        }}
      />
    </>
  )
}
