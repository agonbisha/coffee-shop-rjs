import { ArrowUpRight, Box, CircleDollarSign, PackageCheck, UsersRound } from 'lucide-react'

const icons = { sales: CircleDollarSign, orders: PackageCheck, customers: UsersRound, products: Box }

export default function StatCard({ stat }) {
  const Icon = icons[stat.icon]
  return <article className="stat-card"><span className="stat-icon"><Icon size={18} /></span><span className="stat-label">{stat.label}</span><strong>{stat.value}</strong><small className="stat-change"><ArrowUpRight size={12} /> {stat.change} <span>vs. last period</span></small></article>
}