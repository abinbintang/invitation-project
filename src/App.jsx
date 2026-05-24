import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpContact, setRsvpContact] = useState('')
  const [rsvpPersons, setRsvpPersons] = useState('1')
  const [attend, setAttend] = useState('yes')

  const handlePersonsChange = (e) => {
    setRsvpPersons(e.target.value)
  }

  const handlePersonsBlur = () => {
    let s = String(rsvpPersons || '')
    // trim leading zeros
    if (/^0+/.test(s)) s = s.replace(/^0+/, '')
    // if empty or invalid, enforce minimum 1
    if (s === '' || isNaN(Number(s)) || Number(s) < 1) {
      setRsvpPersons('1')
      return
    }
    // clamp to allowed range
    const n = Math.max(1, Math.min(10, parseInt(s, 10)))
    setRsvpPersons(String(n))
  }

  const handleRsvpSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: rsvpName,
      contact: rsvpContact,
      persons: Number(rsvpPersons),
    }
    // For now just log — replace with API call if available
    // Basic validation
    if (!rsvpName || rsvpName.trim() === '') {
      alert('Please enter your full name.')
      return
    }
    if (!rsvpContact || rsvpContact.trim() === '') {
      alert('Please enter your email or phone.')
      return
    }
    if (attend === 'yes') {
      if (!rsvpPersons || Number(rsvpPersons) < 1) {
        alert('Please enter number of guests attending.')
        return
      }
    }

    console.log('RSVP submitted', { ...payload, attend })
    alert('Thanks — your RSVP has been recorded.')
    setRsvpName('')
    setRsvpContact('')
    setRsvpPersons('1')
  }

  return (
    <>
      <Navbar />
      {/* Gallery will appear after the story section; Carousel removed */}

      <section id="center">
        <div className="hero">
        </div>
        <div>
            <h1 className="names">Joko</h1>
          <h2 className="names">&</h2>
            <h1 className="names">Widodo</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </p>
        </div>
      </section>

      <section id="details">
        <div className="details-grid">
          <div className="person-card">
            <h3>Groom — Joko</h3>
            <ul>
              <li><strong>Parents:</strong> Bapak Joko Sr. & Ibu Siti</li>
              <li><strong>Education:</strong> B.Sc. in Architecture, Universitas Indonesia</li>
              <li><strong>Background:</strong> Grew up in Yogyakarta; enjoys travel and photography.</li>
              <li><strong>Work:</strong> Senior Architect at Studio Creative</li>
            </ul>
          </div>

          <div className="person-card">
            <h3>Bride — Widodo</h3>
            <ul>
              <li><strong>Parents:</strong> Bapak Ali & Ibu Maria</li>
              <li><strong>Education:</strong> M.A. in Literature, Universitas Gadjah Mada</li>
              <li><strong>Background:</strong> Raised in Bandung; loves books and botanical art.</li>
              <li><strong>Work:</strong> Content Strategist at Bright Media</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-diamond"></div>
          <div className="divider-line right"></div>
        </div>
        <h2 className="section-title">Our Story</h2>
        <p className="story-text">
          What began as a quiet conversation over coffee in a Florentine bookshop became the adventure of a lifetime. We discovered in each other a kindred spirit, a steady hand, a home.
        </p>
      </section>
      <section id="gallery" className="gallery-section">
        <div className="gallery-card">
          <p className="section-label">Memories</p>
          <h2 className="section-title">Photo Gallery</h2>
          <div className="gallery-carousel reveal">
            <div className="gallery-track">
              <div className="gallery-item">
                <img src={heroImg} alt="hero" />
              </div>
              <div className="gallery-item">
                <img src={reactLogo} alt="react" />
              </div>
              <div className="gallery-item">
                <img src={viteLogo} alt="vite" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="video-embed">
        <div className="video-container">
          <h2>Watch Our Story</h2>
          <div className="embed">
            <iframe
              title="Our Story Video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <section id="schedule">
        <div className="schedule-container">
          <h2>Schedule</h2>
          <div className="schedule-grid">
            <div className="schedule-info">
              <div className="info-item">
                <h3>Place</h3>
                <p>Grand Ballroom, The Heritage Hotel</p>
              </div>
              <div className="info-item">
                <h3>Date &amp; Time</h3>
                <p>Saturday, 12 December 2026 — 4:00 PM</p>
              </div>
              <div className="info-item">
                <h3>Theme</h3>
                <p>Classic Garden</p>
              </div>
            </div>
            <div className="schedule-map">
              <h3>Location Map</h3>
              <div className="map-wrap">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps?q=Central%20Park%20NYC&output=embed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rsvp-section">
        <div className="rsvp-card">
          <p className="section-label">Kindly Reply</p>
          <h2 className="section-title">RSVP</h2>
          <p className="rsvp-subtitle">We hope to celebrate with you</p>

          <form className="rsvp-form" onSubmit={handleRsvpSubmit}>
            <div className="rsvp-row">
              <label className="rsvp-label" htmlFor="rsvp-name">Full name</label>
              <input id="rsvp-name" className="rsvp-input" type="text" placeholder="Your Full Name" value={rsvpName} onChange={e => setRsvpName(e.target.value)} required />
            </div>

            <div className="rsvp-row">
              <label className="rsvp-label" htmlFor="rsvp-contact">Email or phone</label>
              <input id="rsvp-contact" className="rsvp-input" type="text" placeholder="Email or Phone" value={rsvpContact} onChange={e => setRsvpContact(e.target.value)} required />
            </div>

            <div className="rsvp-row">
              <label className="rsvp-label" htmlFor="rsvp-persons">Number of guests</label>
              <input id="rsvp-persons" className="rsvp-input" type="number" placeholder="Number of Guests" min="1" max="10" value={rsvpPersons} onChange={handlePersonsChange} onBlur={handlePersonsBlur} required={attend === 'yes'} disabled={attend !== 'yes'} />
            </div>

            <div className="rsvp-row" style={{textAlign:'center'}}>
              <div className="rsvp-label" style={{marginBottom:8}}>Will you attend?</div>
              <div style={{display:'flex', gap:12, justifyContent:'center'}}>
                <label className="rsvp-radio" style={{alignItems:'center'}}>
                  <input type="radio" name="attend" value="yes" checked={attend === 'yes'} onChange={() => setAttend('yes')} />
                  Joyfully Accepts
                </label>
                <label className="rsvp-radio" style={{alignItems:'center'}}>
                  <input type="radio" name="attend" value="no" checked={attend === 'no'} onChange={() => { setAttend('no'); setRsvpPersons('0'); }} />
                  Regretfully Declines
                </label>
              </div>
            </div>

            <div className="rsvp-row">
              <label className="rsvp-label" htmlFor="rsvp-note">Message / dietary requirements</label>
              <textarea id="rsvp-note" className="rsvp-input" rows="3" placeholder="Dietary requirements or message…" style={{resize:'none'}} />
            </div>

            <div style={{textAlign:'center', marginTop:12}}>
              <button className="rsvp-btn" type="submit">Send Reply</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default App
