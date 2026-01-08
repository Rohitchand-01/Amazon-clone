import './Rating.css'

function Rating({ rating = 0, reviewCount = 0, showCount = true, size = 'md' }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return (
    <div className={`rating rating-${size}`}>
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star star-full">★</span>
        ))}
        {hasHalfStar && <span className="star star-half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star star-empty">★</span>
        ))}
      </div>
      {showCount && reviewCount > 0 && (
        <span className="rating-count">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}

export default Rating
