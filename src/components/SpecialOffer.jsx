import { useEffect, useState } from 'react'
import { FaArrowRight, FaRegClock } from 'react-icons/fa'

function getNextOfferEnd() {
  // The weekly offer expires Sunday night and starts a fresh countdown next week.
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  end.setDate(end.getDate() + ((7 - end.getDay()) % 7))
  return end
}

export default function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, getNextOfferEnd() - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(Math.max(0, getNextOfferEnd().getTime() - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const days = Math.floor(timeLeft / 86400000)
  const hours = Math.floor((timeLeft % 86400000) / 3600000)
  const minutes = Math.floor((timeLeft % 3600000) / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  return (
    <section className="offer-section">
      <div className="offer-image" /><div className="offer-shade" />
      <div className="offer-content content-width reveal">
        <span className="eyebrow"><FaRegClock /> A LITTLE SOMETHING FOR YOUR WEEK</span>
        <h2>Coffee of<br />the <em>week.</em></h2>
        <p>Get 20% OFF your favorite coffee.<br />Because the best things are worth sharing.</p>
        <div className="countdown" aria-label={`Offer ends in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`}>
          {[['DAYS', days], ['HRS', hours], ['MIN', minutes], ['SEC', seconds]].map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
        </div>
        <a className="button button-cream" href="#menu">Find your favorite <FaArrowRight /></a>
      </div>
      <span className="offer-side-note">GOOD THINGS DON’T LAST FOREVER</span>
    </section>
  )
}
