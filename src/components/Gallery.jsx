import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

const photos = [
  { name: 'The perfect pour', type: 'Coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85', size: 'gallery-tall' },
  { name: 'Behind the bar', type: 'Our people', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85', size: '' },
  { name: 'A warm welcome', type: 'Our space', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85', size: '' },
  { name: 'Something sweet', type: 'Made in-house', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', size: '' },
  { name: 'Little works of art', type: 'Latte love', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=85', size: '' },
  { name: 'From the source', type: 'Good beans', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85', size: 'gallery-wide' },
]

export default function Gallery() {
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="content-width">
        <div className="section-heading reveal"><div><span className="eyebrow">THE BREW & BEAN FEELING</span><h2>Come on <em>in.</em></h2></div><p>A peek at the people, places, and pours that make this our kind of place.</p></div>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <figure className={`gallery-item ${photo.size} reveal`} key={photo.name} style={{ '--reveal-delay': `${index * 60}ms` }}>
              <img src={photo.image} alt={photo.name} loading="lazy" />
              <figcaption><span><small>{photo.type}</small>{photo.name}</span><FaArrowUpRightFromSquare /></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
