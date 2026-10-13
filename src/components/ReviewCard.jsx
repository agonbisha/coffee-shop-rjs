import { BadgeCheck, Star } from 'lucide-react'

export default function ReviewCard({ review }) {
  return <article className="review-card"><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}</div><blockquote>“{review.text}”</blockquote><div className="review-author"><span className="review-avatar">{review.name.charAt(0)}</span><span><strong>{review.name}</strong><small>{review.location} · {review.product}</small></span>{review.verified && <span className="verified"><BadgeCheck size={13} /> VERIFIED</span>}</div></article>
}