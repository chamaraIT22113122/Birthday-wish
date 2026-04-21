import { useEffect, useRef } from 'react'

const EMOJIS = ['🌸','✨','🎀','💫','🌺','🎈','💖','🦋','⭐','🌟','💝','🌹','🎊','🍀']

export default function FloatingEmojis() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const items = []
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div')
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      const dur   = (Math.random() * 12 + 8).toFixed(1)
      const delay = (Math.random() * parseFloat(dur)).toFixed(1)
      const size  = Math.random() * 1.4 + 0.9
      el.textContent  = emoji
      el.style.cssText = `
        position:absolute;
        font-size:${size}rem;
        left:${Math.random() * 100}%;
        bottom:-60px;
        opacity:0;
        animation: floatUp ${dur}s linear ${delay}s infinite;
        pointer-events:none;
      `
      container.appendChild(el)
      items.push(el)
    }
    return () => items.forEach(el => el.remove())
  }, [])

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform:translateY(0) rotate(0deg);   opacity:0; }
          10%  { opacity:0.65; }
          90%  { opacity:0.4; }
          100% { transform:translateY(-110vh) rotate(360deg); opacity:0; }
        }
      `}</style>
      <div
        ref={ref}
        style={{
          position:'fixed', top:0, left:0,
          width:'100%', height:'100%',
          pointerEvents:'none', zIndex:0, overflow:'hidden',
        }}
      />
    </>
  )
}
