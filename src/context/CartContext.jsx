import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const readCart = () => {
  try { return JSON.parse(localStorage.getItem('based-cart') || '[]') } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  useEffect(() => { localStorage.setItem('based-cart', JSON.stringify(items)) }, [items])

  const value = useMemo(() => {
    const addItem = (product, quantity = 1) => setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id))
    const updateQuantity = (id, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item))
    const clearCart = () => setItems([])
    const count = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 6
    return { items, count, subtotal, shipping, total: subtotal + shipping, addItem, removeItem, updateQuantity, clearCart }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}