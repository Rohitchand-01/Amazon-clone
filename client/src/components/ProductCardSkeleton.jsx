import './ProductCardSkeleton.css'

function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-rating"></div>
        <div className="skeleton-line skeleton-price"></div>
        <div className="skeleton-line skeleton-delivery"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
