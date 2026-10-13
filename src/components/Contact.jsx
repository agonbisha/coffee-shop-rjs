import { useState } from 'react'
import { FaArrowRight, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    // Preserve browser-required checks before preparing the visitor's email draft.
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const name = data.get('name')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const message = data.get('message')?.toString().trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    const subject = encodeURIComponent(`A note from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:hello@brewandbean.coffee?subject=${subject}&body=${body}`
    form.reset()
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="content-width contact-grid">
        <div className="contact-info reveal">
          <span className="eyebrow">WE’D LOVE TO SEE YOU</span>
          <h2>Drop by.<br /><em>Stay awhile.</em></h2>
          <p>Questions, kind words, coffee recommendations? Our door (and inbox) are always open.</p>
          <div className="contact-details">
            <a href="https://maps.google.com/?q=28+Orchard+Street+New+York+NY" target="_blank" rel="noreferrer"><span><FaMapMarkerAlt /></span><div><small>FIND OUR LITTLE CORNER</small><strong>28 Orchard Street, New York, NY</strong></div></a>
            <a href="tel:+12125550148"><span><FaPhoneAlt /></span><div><small>GIVE US A RING</small><strong>(212) 555-0148</strong></div></a>
            <a href="mailto:hello@brewandbean.coffee"><span><FaEnvelope /></span><div><small>SEND A NOTE</small><strong>hello@brewandbean.coffee</strong></div></a>
            <div className="hours-detail"><span><FaClock /></span><div><small>WHEN THE COFFEE’S ON</small><strong>Mon–Fri 7am–6pm · Sat–Sun 8am–5pm</strong></div></div>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="form-heading"><span className="eyebrow">SAY HELLO</span><h3>Send us a little note.</h3></div>
          {submitted && <div className="form-success" role="status">Your email app should open with your note ready to send.</div>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" placeholder="Jane Smith" autoComplete="name" required minLength="2" onChange={() => setSubmitted(false)} />
          <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="jane@email.com" autoComplete="email" required onChange={() => setSubmitted(false)} />
          <label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" placeholder="Tell us anything..." rows="4" required minLength="10" onChange={() => setSubmitted(false)} />
          <button className="button" type="submit">Send your note <FaArrowRight /></button>
        </form>
      </div>
    </section>
  )
}
