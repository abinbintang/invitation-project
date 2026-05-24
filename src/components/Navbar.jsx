import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand">Lorem Ipsum</div>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#center">Lorem</a>
          <a href="#story">Ipsum</a>
          <a href="#schedule">Dolor</a>
          <a href="#rsvp">Sit</a>
          <a href="#contact">Consectetur</a>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </button>
      </div>
    </header>
  )
}
