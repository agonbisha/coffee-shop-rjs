import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa6'

const links = [['Home', '#home'], ['Our story', '#about'], ['The menu', '#menu'], ['Gallery', '#gallery'], ['Get in touch', '#contact']]
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand-block"><a className="brand footer-brand" href="#home"><span className="brand-mark"><span>☕</span></span><span className="brand-copy"><span>Brew <i>&</i> Bean</span><small>COFFEE HOUSE</small></span></a><p>Crafted with passion.<br />Served with warmth.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a><a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a></div></div>
        <div className="footer-nav"><h3>COME ON IN</h3>{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div className="footer-hours"><h3>THE IMPORTANT BITS</h3><p>Mon – Fri <span>7am – 6pm</span></p><p>Sat – Sun <span>8am – 5pm</span></p><a href="mailto:hello@brewandbean.coffee">hello@brewandbean.coffee</a></div>
        <a className="footer-top" href="#home" aria-label="Back to top"><FaArrowUp /></a>
      </div>
      <div className="footer-bottom content-width"><span>© {currentYear} Brew & Bean Coffee House</span><span>Good coffee. Good people. Always.</span></div>
    </footer>
  )
}
