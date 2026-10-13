import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function Wishlist() {
  const { ids } = useWishlist()
  const saved = products.filter((product) => ids.includes(product.id))
  return <main className="wishlist-page content-width"><header className="page-title-row"><div><span className="eyebrow">THE SHORTLIST</span><h1>Saved things<span className="title-period">.</span></h1><p>A few good things to come back to.</p></div><span className="catalog-count">{String(saved.length).padStart(2, '0')} SAVED</span></header>{saved.length ? <ProductGrid products={saved} /> : <section className="cart-empty"><span className="empty-bag"><Heart size={23} /></span><h2>Keep a little list.</h2><p>Tap the heart on anything that feels like your kind of everyday.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={15} /></Link></section>}</main>
}