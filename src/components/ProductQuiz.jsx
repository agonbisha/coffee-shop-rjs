import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

const questions = [
  { key: 'focus', title: 'What brings you here?', options: ['Haircare', 'Skincare', 'A bit of both'] },
  { key: 'hairType', title: 'How would you describe your hair?', options: ['Straight', 'Wavy', 'Curly', 'Coily', 'Not applicable'] },
  { key: 'routine', title: 'How much routine feels right?', options: ['Keep it minimal', 'A few good steps', 'The full ritual'] },
  { key: 'goal', title: 'What are you looking for today?', options: ['A fresh, clean start', 'A little more moisture', 'Texture and shape', 'An easy everyday reset'] },
]

export default function ProductQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [complete, setComplete] = useState(false)
  const question = questions[step]
  const pick = (answer) => {
    setAnswers((current) => ({ ...current, [question.key]: answer }))
    if (step === questions.length - 1) setComplete(true)
    else setStep((current) => current + 1)
  }
  const back = () => { if (complete) setComplete(false); else if (step > 0) setStep((current) => current - 1) }

  let recommendations = products
  if (answers.focus === 'Haircare') recommendations = recommendations.filter((product) => product.categories.includes('Haircare'))
  if (answers.focus === 'Skincare') recommendations = recommendations.filter((product) => product.categories.includes('Skincare'))
  if (answers.focus === 'A bit of both') recommendations = recommendations.filter((product) => product.categories.includes('Haircare') || product.categories.includes('Skincare'))
  if (answers.hairType && answers.hairType !== 'Not applicable') {
    const hairMatches = recommendations.filter((product) => product.categories.includes('Haircare') && product.hairTypes.includes(answers.hairType))
    if (hairMatches.length && answers.focus !== 'Skincare') recommendations = hairMatches
  }
  const goal = answers.goal?.includes('clean') ? 'cleanse' : answers.goal?.includes('moisture') ? 'moisture' : answers.goal?.includes('Texture') ? 'texture' : 'refresh'
  const goalMatches = recommendations.filter((product) => product.goals.includes(goal))
  if (goalMatches.length) recommendations = goalMatches
  if (answers.routine === 'Keep it minimal') recommendations = recommendations.slice(0, 2)
  else if (answers.routine === 'A few good steps') recommendations = recommendations.slice(0, 3)

  return <section className="quiz-card">
    <div className="quiz-heading"><span className="eyebrow">YOUR ROUTINE, YOUR WAY</span><h2>{complete ? 'A good place to start.' : 'A few quick questions.'}</h2><p>{complete ? 'A simple, informational edit based on what you shared. Explore the product details to decide what fits you.' : 'No complicated formulas. Just a few prompts to help you find your shelf.'}</p></div>
    {!complete ? <><div className="quiz-progress" aria-label={`Step ${step + 1} of ${questions.length}`}><div><span>STEP 0{step + 1} <i>/ 0{questions.length}</i></span><span>{Math.round(((step + 1) / questions.length) * 100)}%</span></div><span className="progress-track"><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></span></div><div className="quiz-question"><h3>{question.title}</h3><div className="quiz-options">{question.options.map((option) => <button type="button" key={option} className={answers[question.key] === option ? 'is-selected' : ''} onClick={() => pick(option)}>{option}<ArrowRight size={15} /></button>)}</div></div>{step > 0 && <button className="quiz-back" type="button" onClick={back}><ArrowLeft size={14} /> Previous question</button>}</> : <><div className="quiz-summary">{Object.values(answers).map((answer) => <span key={answer}><Check size={12} />{answer}</span>)}</div><div className="quiz-results">{recommendations.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div><div className="quiz-reset"><button type="button" onClick={() => { setAnswers({}); setStep(0); setComplete(false) }}><ArrowLeft size={14} /> Start again</button><Link to="/shop">Shop all products <ArrowRight size={14} /></Link></div></>}
  </section>
}