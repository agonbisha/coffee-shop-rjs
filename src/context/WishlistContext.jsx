import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext(null)
const readWishlist = () => {
  try { return JSON.parse(localStorage.getItem('based-wishlist') || '[]') } catch { return [] }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readWishlist)
  useEffect(() => { localStorage.setItem('based-wishlist', JSON.stringify(ids)) }, [ids])
  const value = useMemo(() => ({
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => setIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
  }), [ids])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
  return context
}