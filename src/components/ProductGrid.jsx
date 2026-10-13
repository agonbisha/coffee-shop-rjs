import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  return products.length ? <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-state"><h2>Nothing on this shelf.</h2><p>Try a different search or category.</p></div>
}