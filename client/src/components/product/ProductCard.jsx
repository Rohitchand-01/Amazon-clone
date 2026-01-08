import { Link } from 'react-router-dom'
import Rating from '../Rating'
import Badge from '../Badge'
import './ProductCard.css'

function ProductCard({ product, sponsored = false }) {
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0]
  const imageUrl = primaryImage?.imageUrl || product.imageUrl || product.primary_image
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 1)

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-wrapper">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          )}
        </div>
        <div className="product-info">
          {sponsored && (
            <Badge variant="sponsored" className="product-sponsored">
              Sponsored
            </Badge>
          )}
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
          <div className="product-rating">
            <Rating
              rating={parseFloat(product.rating) || 0}
              reviewCount={product.reviewCount || 0}
              size="sm"
            />
          </div>
          <div className="product-price-section">
            <span className="product-price">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.listPrice && parseFloat(product.listPrice) > parseFloat(product.price) && (
              <span className="product-list-price">
                ${parseFloat(product.listPrice).toFixed(2)}
              </span>
            )}
          </div>
          {product.isPrime && (
            <div className="product-prime">
              <Badge variant="prime">Prime</Badge>
            </div>
          )}
          <div className="product-delivery">
            <span className="delivery-text">
              FREE delivery <strong>{deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</strong>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
