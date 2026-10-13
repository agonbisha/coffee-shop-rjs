import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function WishlistButton({ product, compact = false }) {
  const { has, toggle } = useWishlist()
  const saved = has(product.id)
  return <button className={`wishlist-button${saved ? ' is-saved' : ''}${compact ? ' is-compact' : ''}`} type="button" aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved} title={saved ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggle(product.id)}><Heart size={compact ? 16 : 17} fill={saved ? 'currentColor' : 'none'} />{!compact && <span>{saved ? 'SAVED' : 'SAVE'}</span>}</button>
}