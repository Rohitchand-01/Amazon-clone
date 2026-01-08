import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductGrid from '../components/product/ProductGrid'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import './HomePage.css'

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      const products = await getProducts({ limit: 12 })
      setFeaturedProducts(products)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Amazon Clone</h1>
            <p>Shop millions of products with fast, free delivery</p>
            <Link to="/search">
              <button className="hero-button">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="home-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="product-grid">
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </div>

      {/* Category Sections */}
      <div className="home-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            <Link to="/search?category=electronics" className="category-card">
              <div className="category-icon">📱</div>
              <h3>Electronics</h3>
            </Link>
            <Link to="/search?category=books" className="category-card">
              <div className="category-icon">📚</div>
              <h3>Books</h3>
            </Link>
            <Link to="/search?category=home" className="category-card">
              <div className="category-icon">🏠</div>
              <h3>Home & Kitchen</h3>
            </Link>
            <Link to="/search?category=clothing" className="category-card">
              <div className="category-icon">👕</div>
              <h3>Clothing</h3>
            </Link>
            <Link to="/search?category=sports" className="category-card">
              <div className="category-icon">⚽</div>
              <h3>Sports & Outdoors</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
