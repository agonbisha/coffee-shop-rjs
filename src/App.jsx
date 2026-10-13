import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import Cart from './components/Cart.jsx'
import SpecialOffer from './components/SpecialOffer.jsx'
import Gallery from './components/Gallery.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const closeCart = useCallback(() => setCartOpen(false), [])

  const addToCart = (product, customizations = []) => {
    const customizationKey = customizations.map((option) => option.id).sort().join('-')
    const cartItemId = customizationKey ? `${product.id}-${customizationKey}` : product.id
    const price = product.price + customizations.reduce((sum, option) => sum + option.price, 0)

    setCartItems((items) => {
      const match = items.find((item) => item.id === cartItemId)
      return match
        ? items.map((item) => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, id: cartItemId, price, customizations, quantity: 1 }]
    })
  }

  const changeQuantity = (id, change) => {
    setCartItems((items) => items
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0))
  }

  useEffect(() => {
    // Reveal sections only once, then stop observing them for smoother scrolling.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Menu onAddToCart={addToCart} />
        <SpecialOffer />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Cart
        items={cartItems}
        isOpen={cartOpen}
        onClose={closeCart}
        onChangeQuantity={changeQuantity}
        onClear={() => setCartItems([])}
      />
    </>
  )
}

export default App
