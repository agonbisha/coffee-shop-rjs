import { NavLink } from 'react-router-dom'
import { BarChart3, Box, ChevronLeft, LayoutDashboard, ShoppingBasket, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [['Overview', '/admin', LayoutDashboard], ['Orders', '/admin#orders', ShoppingBasket], ['Products', '/admin#products', Box], ['Customers', '/admin#customers', UsersRound], ['Analytics', '/admin#analytics', BarChart3]]

export default function AdminSidebar() {
  return <aside className="admin-sidebar"><Link className="admin-brand" to="/"><span className="admin-mark">B</span><span>BASED<small>DEMO STORE</small></span></Link><span className="admin-nav-label">WORKSPACE</span><nav>{items.map(([label, href, Icon], index) => <NavLink key={label} to={href} end={index === 0}><Icon size={17} />{label}{index === 1 && <span className="sidebar-badge">5</span>}</NavLink>)}</nav><Link className="back-store-link" to="/"><ChevronLeft size={16} /> Back to storefront</Link><div className="admin-user"><span>AM</span><div><strong>Admin Demo</strong><small>Student preview</small></div></div></aside>
}