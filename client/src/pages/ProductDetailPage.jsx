import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/api'
import ImageGallery from '../components/product/ImageGallery'
import BuyBox from '../components/product/BuyBox'
import Rating from '../components/Rating'
import Badge from '../components/Badge'
import LoadingSpinner from '../components/LoadingSpinner'
import './ProductDetailPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProduct(id)
      setProduct(data)
    } catch (err) {
      setError('Failed to load product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading">
            <LoadingSpinner size="lg" />
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error">{error || 'Product not found'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href={`/search?category=${product.category?.name?.toLowerCase() || 'all'}`}>
            {product.category?.name || 'All'}
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Left: Image Gallery */}
          <div className="product-detail-images">
            <ImageGallery images={product.images || []} />
          </div>

          {/* Center: Product Info */}
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="product-detail-rating">
              <Rating
                rating={parseFloat(product.rating) || 0}
                reviewCount={product.reviewCount || 0}
                size="md"
              />
            </div>

            {product.brand && (
              <div className="product-detail-brand">
                Brand: <strong>{product.brand}</strong>
              </div>
            )}

            <div className="product-detail-price-section">
              <span className="product-detail-price">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.listPrice && parseFloat(product.listPrice) > parseFloat(product.price) && (
                <>
                  <span className="product-detail-list-price">
                    ${parseFloat(product.listPrice).toFixed(2)}
                  </span>
                  <Badge variant="price" className="product-detail-savings">
                    Save ${(parseFloat(product.listPrice) - parseFloat(product.price)).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {product.isPrime && (
              <div className="product-detail-prime">
                <Badge variant="prime">Prime</Badge>
                <span className="prime-delivery">FREE delivery available</span>
              </div>
            )}

            <div className="product-detail-description">
              <h2>About this item</h2>
              <p>{product.description || 'No description available.'}</p>
            </div>

            <div className="product-detail-features">
              <h3>Product Details</h3>
              <ul>
                <li>Price: ${parseFloat(product.price).toFixed(2)}</li>
                {product.brand && <li>Brand: {product.brand}</li>}
                <li>Stock: {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}</li>
                {product.isPrime && <li>Prime Eligible</li>}
              </ul>
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="product-detail-buybox">
            <BuyBox product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
