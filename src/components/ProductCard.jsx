import { useState } from 'react'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import WishlistButton from './WishlistButton.jsx'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const addToCart = () => { addItem(product); setAdded(true) }
  return <article className="product-card" style={{ '--card-delay': `${Math.min(index % 4, 3) * 70}ms` }}>
    <Link className="product-image-link" to={`/product/${product.id}`} aria-label={`View ${product.name}`}><div className="product-image" style={{ backgroundColor: product.swatch }}><img src={product.image} alt={product.name} loading="lazy" /><span className="product-image-label">{product.categoryLabel}</span></div></Link>
    <WishlistButton product={product} compact />
    <div className="product-card-info"><div className="product-title-line"><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><span className="product-price">${product.price}</span></div><p>{product.description}</p><div className="product-rating"><span>★★★★★</span><small>{product.rating.toFixed(1)} ({product.reviewCount})</small></div><button className={`add-button${added ? ' is-added' : ''}`} type="button" onClick={addToCart}>{added ? 'ADDED TO BAG' : 'ADD TO BAG'}{added ? <ArrowUpRight size={14} /> : <ShoppingBag size={14} />}</button></div>
  </article>
}