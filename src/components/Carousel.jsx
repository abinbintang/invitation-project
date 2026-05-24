import { useState, useEffect, useRef } from 'react'
import './Carousel.css'
import hero from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

export default function Carousel() {
  const images = [hero, reactLogo, viteLogo]
  const [idx, setIdx] = useState(0)
  const startX = useRef(0)
  const deltaX = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIdx(i => (i + 1) % images.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const onTouchStart = (e) => {
    paused.current = true
    startX.current = e.touches[0].clientX
    deltaX.current = 0
  }

  const onTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current
  }

  const onTouchEnd = () => {
    const dx = deltaX.current
    const threshold = 50
    if (dx > threshold) setIdx(i => (i - 1 + images.length) % images.length)
    else if (dx < -threshold) setIdx(i => (i + 1) % images.length)
    deltaX.current = 0
    paused.current = false
  }

  return (
    <div className="carousel" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="carousel-inner" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => (
          <div className="carousel-item" key={i}>
            <img src={src} alt={`slide-${i}`} />
          </div>
        ))}
      </div>
      <div className="edge-touch left" onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} aria-hidden="false" />
      <div className="edge-touch right" onClick={() => setIdx(i => (i + 1) % images.length)} aria-hidden="false" />
    </div>
  )
}
