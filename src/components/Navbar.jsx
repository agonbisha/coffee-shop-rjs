import { useState } from 'react'
import { FaCoffee, FaShoppingBag } from 'react-icons/fa'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'

const navigation = [
  ['Home', '#home'],
  ['Menu', '#menu'],
  ['About', '#about'],
  ['Gallery', '#gallery'],
  ['Reviews', '#reviews'],
  ['Contact', '#contact'],
]

export default function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Brew and Bean home">
          <span className="brand-mark"><FaCoffee /></span>
          <span className="brand-copy"><span>Brew <i>&</i> Bean</span><small>COFFEE HOUSE</small></span>
        </a>
        <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <button className="nav-cart" type="button" onClick={() => { onCartClick(); closeMenu() }} aria-label={`Open cart, ${cartCount} items`}>
            <FaShoppingBag /><span className="cart-count">{cartCount}</span>
          </button>
          <a className="button button-small nav-order" href="#menu" onClick={closeMenu}>Order Now <span>↗</span></a>
        </nav>
      </div>
    </header>
  )
}
