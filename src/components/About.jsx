import { FaArrowRight } from 'react-icons/fa'

export default function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-grid content-width">
        <div className="about-visual reveal">
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1100&q=85" alt="Barista carefully preparing a fresh coffee" />
          <div className="about-stamp"><span>MADE WITH</span><b>♥</b><span>INTENTION</span></div>
          <div className="about-image-caption">A little craft in every cup.</div>
        </div>
        <div className="about-copy reveal">
          <span className="eyebrow">A CUP WITH A STORY</span>
          <h2>Good coffee.<br /><em>Better company.</em></h2>
          <p className="about-lead">We believe the best part of your day can start with something as simple as a really good cup of coffee.</p>
          <p>Since our first little corner shop, we’ve partnered with thoughtful growers, roasted in small batches, and welcomed everyone like a regular. No shortcuts. Just good beans, kind people, and a space to settle in.</p>
          <a className="text-link" href="#contact">Come say hello <FaArrowRight /></a>
          <div className="stats-row">
            <div><strong>10<span>+</span></strong><small>Years of craft</small></div>
            <div><strong>50<span>+</span></strong><small>Coffee varieties</small></div>
            <div><strong>10<span>K</span></strong><small>Happy customers</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
