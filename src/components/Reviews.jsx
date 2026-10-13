import { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa'

const reviews = [
  { name: 'Maya Thompson', detail: 'A regular since 2021', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80', quote: 'The kind of place that makes you want to take the long way to work. The cappuccino is beautiful, and everyone remembers my name.' },
  { name: 'Ethan Brooks', detail: 'Local since 2019', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80', quote: 'Best cold brew in the neighborhood, hands down. I come for the coffee, but I stay for the warm, easygoing atmosphere.' },
  { name: 'Sofia Patel', detail: 'A regular since 2023', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80', quote: 'It feels like a little exhale in the middle of a busy day. The vanilla latte and warm croissant are my perfect order.' },
  { name: 'Oliver Chen', detail: 'Local since 2020', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80', quote: 'Thoughtful coffee without any fuss. You can tell the team really cares about the beans and the people who walk through the door.' },
]

export default function Reviews() {
  const [active, setActive] = useState(0)
  const review = reviews[active]
  const move = (direction) => setActive((index) => (index + direction + reviews.length) % reviews.length)

  return (
    <section className="reviews-section section-pad" id="reviews">
      <div className="content-width review-inner">
        <div className="review-intro reveal"><span className="eyebrow">KIND WORDS, FULL CUPS</span><h2>Don’t just take<br /><em>our word for it.</em></h2><div className="review-overall"><span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span><b>4.9 out of 5</b><small>From our lovely regulars</small></div></div>
        <div className="review-card-wrap reveal">
          <span className="quote-mark">“</span>
          <div className="review-stars" aria-label="5 out of 5 stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
          <blockquote key={review.name}>{review.quote}</blockquote>
          <div className="review-person"><img src={review.image} alt="" /><div><strong>{review.name}</strong><span>{review.detail}</span></div><div className="review-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous review"><FaArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next review"><FaArrowRight /></button></div></div>
          <div className="review-progress"><span style={{ width: `${((active + 1) / reviews.length) * 100}%` }} /></div>
        </div>
      </div>
    </section>
  )
}
