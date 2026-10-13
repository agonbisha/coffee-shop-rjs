import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    updateVisibility()
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return <a className={`back-to-top${visible ? ' is-visible' : ''}`} href="#home" aria-label="Back to top" tabIndex={visible ? 0 : -1}><FaArrowUp /></a>
}
