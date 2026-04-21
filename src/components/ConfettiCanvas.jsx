import { useEffect, useRef } from 'react'

const COLORS = [
  '#ff6eb4','#fbbf24','#a855f7','#38bdf8',
  '#fb7185','#34d399','#f472b6','#60a5fa',
  '#e879f9','#facc15',
]

class Particle {
  constructor(canvas, x, y, burst = false) {
    this.canvas = canvas
    this.x = x ?? Math.random() * canvas.width
    this.y = y ?? -20
    this.size   = Math.random() * 9 + 4
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.speedX = burst ? (Math.random() - 0.5) * 16 : (Math.random() - 0.5) * 3
    this.speedY = burst ? (Math.random() - 0.5) * 16 - 4 : Math.random() * 3 + 1.5
    this.rotation  = Math.random() * 360
    this.rotSpeed  = (Math.random() - 0.5) * 6
    this.opacity   = 1
    this.wave      = Math.random() * Math.PI * 2
    this.shape     = Math.random() > 0.5 ? 'rect' : 'circle'
  }

  update() {
    this.y += this.speedY
    this.wave += 0.04
    this.x += this.speedX + Math.sin(this.wave) * 1.0
    this.rotation += this.rotSpeed
    if (this.y > this.canvas.height - 80) this.opacity -= 0.025
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.opacity)
    ctx.translate(this.x, this.y)
    ctx.rotate((this.rotation * Math.PI) / 180)
    ctx.fillStyle = this.color
    if (this.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2)
    }
    ctx.restore()
  }

  isDead() { return this.opacity <= 0 || this.y > this.canvas.height + 60 }
}

export default function ConfettiCanvas({ burstRef }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let raf
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ambient trickle
      if (particlesRef.current.length < 70) {
        for (let i = 0; i < 2; i++) particlesRef.current.push(new Particle(canvas))
      }
      particlesRef.current = particlesRef.current.filter(p => !p.isDead())
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx) })
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Expose burst function
    if (burstRef) {
      burstRef.current = (x, y, count = 60) => {
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(new Particle(canvas, x, y, true))
        }
      }
    }

    // Boot burst
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const x = Math.random() * canvas.width
          if (burstRef?.current) burstRef.current(x, canvas.height * 0.25, 20)
        }, i * 180)
      }
    }, 600)

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [burstRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 999,
      }}
    />
  )
}
