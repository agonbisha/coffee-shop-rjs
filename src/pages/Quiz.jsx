import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductQuiz from '../components/ProductQuiz.jsx'

export default function Quiz() {
  return <main className="quiz-page"><header className="quiz-page-intro"><span className="eyebrow">A ROUTINE, NOT A RULEBOOK</span><h1>Find your<br /><em>everyday.</em></h1><p>A little direction for your shelf. This general discovery quiz offers informational product ideas, not skincare or haircare advice.</p><Link className="underlined-link" to="/shop">Rather browse for yourself? <ArrowRight size={14} /></Link></header><ProductQuiz /><span className="quiz-side-note">BASED / DISCOVERY NO. 01</span></main>
}