import { FaArrowRight, FaCoffee, FaStar } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" role="img" aria-label="Freshly poured coffee in a sunlit cafe" />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow hero-eyebrow"><span /> YOUR NEIGHBORHOOD COFFEE HOUSE</span>
        <h1>Your Daily Cup<br />of <em>Happiness.</em></h1>
        <p>Slow mornings, good coffee, and a little moment just for you. Find your new favorite in every cup.</p>
        <div className="hero-actions">
          <a className="button" href="#menu">Explore Menu <FaArrowRight /></a>
          <a className="button button-outline-light" href="#menu">Order Now</a>
        </div>
        <div className="hero-rating"><span className="rating-stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span><span><b>4.9/5</b> from 2,000+ coffee lovers</span></div>
      </div>
      <a className="hero-scroll" href="#about"><span /> SCROLL TO SLOW DOWN</a>
      <div className="hero-note"><FaCoffee /><span>GOOD DAYS<br />START HERE</span></div>
    </section>
  )
}
