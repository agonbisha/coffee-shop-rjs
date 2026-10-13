import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search products' }) {
  return <label className="catalog-search"><Search size={16} /><span className="sr-only">{placeholder}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />{value && <button type="button" onClick={() => onChange('')} aria-label="Clear search"><X size={15} /></button>}</label>
}