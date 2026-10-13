export default function CategoryFilter({ options, selected, onChange }) {
  return <div className="category-filter" role="group" aria-label="Filter by category">{options.map((category) => <button className={selected === category ? 'is-active' : ''} key={category} type="button" aria-pressed={selected === category} onClick={() => onChange(category)}>{category}</button>)}</div>
}