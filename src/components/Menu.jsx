import { useCallback, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { menuData } from '../data/menuData.js'
import MenuCard from './MenuCard.jsx'
import ProductCustomizationModal from './ProductCustomizationModal.jsx'

const categories = ['All', 'Coffee', 'Cold Drinks', 'Desserts']

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [customizingProduct, setCustomizingProduct] = useState(null)
  const products = activeCategory === 'All' ? menuData : menuData.filter((product) => product.category === activeCategory)
  const closeCustomization = useCallback(() => setCustomizingProduct(null), [])

  const addCustomizedProduct = (customizations) => {
    onAddToCart(customizingProduct, customizations)
    closeCustomization()
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('#menu .menu-grid .reveal:not(.is-visible)').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [activeCategory])

  return (
    <section className="menu-section section-pad" id="menu">
      <div className="content-width">
        <div className="section-heading reveal">
          <div><span className="eyebrow">MADE FRESH, EVERY DAY</span><h2>Your next <em>favorite.</em></h2></div>
          <a href="#contact" className="text-link">See what’s brewing <FaArrowRight /></a>
        </div>
        <div className="menu-controls reveal" role="group" aria-label="Filter menu items">
          <p>Good things, made with good things.</p>
          <div className="category-tabs">
            {categories.map((category) => <button key={category} className={activeCategory === category ? 'is-active' : ''} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
          </div>
        </div>
        <div className="menu-grid">
          {products.map((product, index) => <div className="reveal" key={product.id} style={{ '--reveal-delay': `${(index % 4) * 80}ms` }}><MenuCard product={product} onAdd={setCustomizingProduct} /></div>)}
        </div>
      </div>
      {customizingProduct && (
        <ProductCustomizationModal
          key={customizingProduct.id}
          product={customizingProduct}
          onClose={closeCustomization}
          onConfirm={addCustomizedProduct}
        />
      )}
    </section>
  )
}
