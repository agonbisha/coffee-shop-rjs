import { useEffect, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

const beverageOptions = {
  milk: [
    { id: 'whole-milk', name: 'Whole milk', price: 0.5 },
    { id: 'oat-milk', name: 'Oat milk', price: 0.75 },
    { id: 'almond-milk', name: 'Almond milk', price: 0.75 },
  ],
  extras: [
    { id: 'extra-shot', name: 'Extra espresso shot', price: 1.25 },
    { id: 'vanilla-syrup', name: 'Vanilla syrup', price: 0.6 },
    { id: 'caramel-syrup', name: 'Caramel syrup', price: 0.6 },
  ],
}

const dessertOptions = {
  extras: [
    { id: 'whipped-cream', name: 'Whipped cream', price: 0.75 },
    { id: 'extra-chocolate', name: 'Chocolate drizzle', price: 0.5 },
  ],
}

export default function ProductCustomizationModal({ product, onClose, onConfirm }) {
  const [milk, setMilk] = useState('')
  const [extras, setExtras] = useState([])
  const options = product.category === 'Desserts' ? dessertOptions : beverageOptions
  const selectedOptions = [
    ...(milk ? options.milk?.filter((option) => option.id === milk) ?? [] : []),
    ...options.extras.filter((option) => extras.includes(option.id)),
  ]
  const total = product.price + selectedOptions.reduce((sum, option) => sum + option.price, 0)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('customization-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('customization-open')
    }
  }, [onClose])

  const toggleExtra = (id) => {
    setExtras((current) => current.includes(id)
      ? current.filter((extra) => extra !== id)
      : [...current, id])
  }

  return (
    <div className="customization-layer" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="customization-dialog" role="dialog" aria-modal="true" aria-labelledby="customization-title">
        <header className="customization-header">
          <div>
            <span className="eyebrow">MAKE IT YOURS</span>
            <h2 id="customization-title">Customize your {product.name}</h2>
            <p>Choose your extras. We’ll add them to your order.</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close customization" autoFocus><FaTimes /></button>
        </header>

        {options.milk && (
          <fieldset className="customization-group">
            <legend>Milk <span>Choose one</span></legend>
            <label className="customization-option">
              <input type="radio" name="milk" value="" checked={!milk} onChange={() => setMilk('')} />
              <span>No extra milk</span><span className="option-price">Included</span>
            </label>
            {options.milk.map((option) => (
              <label className="customization-option" key={option.id}>
                <input type="radio" name="milk" value={option.id} checked={milk === option.id} onChange={() => setMilk(option.id)} />
                <span>{option.name}</span><span className="option-price">+${option.price.toFixed(2)}</span>
              </label>
            ))}
          </fieldset>
        )}

        <fieldset className="customization-group">
          <legend>{options.milk ? 'Add something extra' : 'Extras'} <span>Optional</span></legend>
          {options.extras.map((option) => (
            <label className="customization-option" key={option.id}>
              <input type="checkbox" checked={extras.includes(option.id)} onChange={() => toggleExtra(option.id)} />
              <span>{option.name}</span><span className="option-price">+${option.price.toFixed(2)}</span>
            </label>
          ))}
        </fieldset>

        <footer className="customization-footer">
          <div><span>Price per item</span><strong>${total.toFixed(2)}</strong></div>
          <button className="button" type="button" onClick={() => onConfirm(selectedOptions)}>
            Add to order <FaPlus /><span>${total.toFixed(2)}</span>
          </button>
        </footer>
      </section>
    </div>
  )
}
