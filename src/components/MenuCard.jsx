import { FaPlus } from 'react-icons/fa'

export default function MenuCard({ product, onAdd }) {
  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="quick-add" type="button" onClick={() => onAdd(product)} aria-label={`Customize ${product.name}`}><FaPlus /></button>
      </div>
      <div className="menu-card-info">
        <div className="menu-card-heading"><h3>{product.name}</h3><span>${product.price.toFixed(2)}</span></div>
        <p>{product.description}</p>
        <button className="add-button" type="button" onClick={() => onAdd(product)}>Customize <FaPlus /></button>
      </div>
    </article>
  )
}
