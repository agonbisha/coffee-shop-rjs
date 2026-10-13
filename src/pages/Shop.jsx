import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDownWideNarrow } from 'lucide-react'
import { categories, products } from '../data/products.js'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'

const priceRanges = { 'All prices': () => true, 'Under $30': (price) => price < 30, '$30–$40': (price) => price >= 30 && price <= 40, '$40+': (price) => price > 40 }

export default function Shop() {
  const { category: routeCategory } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') || ''
  const [priceRange, setPriceRange] = useState('All prices')
  const [sort, setSort] = useState('Featured')
  const selectedCategory = categories.find((item) => item.toLowerCase() === routeCategory?.toLowerCase()) || 'All products'
  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const textMatch = `${product.name} ${product.description} ${product.category} ${product.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase())
      const categoryMatch = selectedCategory === 'All products' || product.categories.includes(selectedCategory)
      return textMatch && categoryMatch && priceRanges[priceRange](product.price)
    })
    if (sort === 'Price: low to high') return result.sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') return result.sort((a, b) => b.price - a.price)
    if (sort === 'Top rated') return result.sort((a, b) => b.rating - a.rating)
    return result
  }, [query, selectedCategory, priceRange, sort])

  const handleSearch = (value) => setSearchParams(value ? { search: value } : {}, { replace: true })
  return <main className="catalog-page content-width"><header className="page-title-row"><div><span className="eyebrow">THE FULL SHELF</span><h1>{selectedCategory === 'All products' ? 'Shop all.' : `${selectedCategory}.`}</h1><p>A considered edit of everyday skin, hair, and body essentials.</p></div><span className="catalog-count">{String(filtered.length).padStart(2, '0')} PRODUCTS</span></header><div className="catalog-controls"><SearchBar value={query} onChange={handleSearch} placeholder="Search the collection" /><div className="catalog-selects"><label><span>PRICE</span><select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>{Object.keys(priceRanges).map((range) => <option key={range}>{range}</option>)}</select></label><label><span><ArrowDownWideNarrow size={13} /> SORT</span><select value={sort} onChange={(event) => setSort(event.target.value)}>{['Featured', 'Price: low to high', 'Price: high to low', 'Top rated'].map((option) => <option key={option}>{option}</option>)}</select></label></div></div><CategoryFilter options={['All products', ...categories]} selected={selectedCategory} onChange={(category) => navigate(category === 'All products' ? '/shop' : `/shop/${encodeURIComponent(category)}`)} /><div className="catalog-results-head"><span>SHOWING {String(filtered.length).padStart(2, '0')} ESSENTIALS</span><span>MADE FOR THE EVERYDAY</span></div><ProductGrid products={filtered} /></main>
}