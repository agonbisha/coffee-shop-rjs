import { useEffect } from 'react'
import { FaMinus, FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa'

export default function Cart({ items, isOpen, onClose, onChangeQuantity, onClear }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('cart-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('cart-open')
    }
  }, [isOpen, onClose])

  return (
    <div className={`cart-layer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={onClose} tabIndex={isOpen ? 0 : -1} aria-label="Close shopping cart" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your shopping bag">
        <div className="cart-header"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Your bag <span>({itemCount})</span></h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close cart"><FaTimes /></button></div>
        {items.length === 0 ? (
          <div className="cart-empty"><span>☕</span><h3>Your bag is taking a little break.</h3><p>Something delicious is just a click away.</p><button className="button" type="button" onClick={onClose}>Explore the menu</button></div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-info"><h3>{item.name}</h3><span>${item.price.toFixed(2)}</span>
                    {item.customizations?.length > 0 && <ul className="cart-item-customizations">{item.customizations.map((option) => <li key={option.id}>{option.name} (+${option.price.toFixed(2)})</li>)}</ul>}
                    <div className="quantity-control">
                      <button type="button" onClick={() => onChangeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><FaMinus /></button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onChangeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><FaPlus /></button>
                    </div>
                  </div>
                  <button className="remove-item" type="button" onClick={() => onChangeQuantity(item.id, -item.quantity)} aria-label={`Remove ${item.name}`}><FaTrashAlt /></button>
                </div>
              ))}
            </div>
            <div className="cart-summary"><button className="clear-cart" type="button" onClick={onClear}>Clear bag</button><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div className="cart-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div><a className="button cart-order-button" href="tel:+12125550148">Order by phone <span>↗</span></a><p>Questions about your order? Call us at (212) 555-0148.</p></div>
          </>
        )}
      </aside>
    </div>
  )
}
