import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProducts, fetchProducts, getCategories } from '../services/api'
import ProductGrid from '../components/product/ProductGrid'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import Input from '../components/Input'
import './ProductListPage.css'

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    primeOnly: false,
  })
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [searchParams, sortBy])

  const loadCategories = async () => {
    try {
      const cats = await getCategories()
      setCategories(cats)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const query = searchParams.get('q') || ''
      const category = searchParams.get('category') || 'all'
      
      let results
      if (query || category !== 'all') {
        // Use search if there's a query or category filter
        const params = {
          q: query,
          category: category !== 'all' ? category : undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          minRating: filters.minRating || undefined,
          isPrime: filters.primeOnly || undefined,
          sortBy,
        }
        results = await searchProducts(params)
      } else {
        // Use regular fetch for all products
        const params = {
          category: undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          minRating: filters.minRating || undefined,
          isPrime: filters.primeOnly || undefined,
          sortBy,
          limit: 50
        }
        results = await fetchProducts(params)
      }
      
      setProducts(Array.isArray(results) ? results : (results.products || []))
    } catch (error) {
      console.error('Failed to load products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams(searchParams)
    if (name === 'search') {
      if (value) params.set('q', value)
      else params.delete('q')
    } else if (name === 'category') {
      if (value !== 'all') params.set('category', value)
      else params.delete('category')
    }
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadProducts()
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="product-list-layout">
          {/* Filters Sidebar */}
          <aside className="product-list-filters">
            <h2>Filter by</h2>
            
            <div className="filter-section">
              <h3>Category</h3>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-section">
              <h3>Price</h3>
              <div className="price-inputs">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>Rating</h3>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                className="filter-select"
              >
                <option value="">All Ratings</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="2">2 Stars & Up</option>
                <option value="1">1 Star & Up</option>
              </select>
            </div>

            <div className="filter-section">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.primeOnly}
                  onChange={(e) => handleFilterChange('primeOnly', e.target.checked)}
                />
                <span>Prime Eligible</span>
              </label>
            </div>

            <button className="filter-apply" onClick={handleSearch}>
              Apply Filters
            </button>
          </aside>

          {/* Products Section */}
          <div className="product-list-main">
            <div className="product-list-header">
              <h1 className="results-title">
                {searchParams.get('q') 
                  ? `Results for "${searchParams.get('q')}"`
                  : 'All Products'}
                {products.length > 0 && ` (${products.length} results)`}
              </h1>
              
              <div className="product-list-sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={handleSortChange} className="sort-select">
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Customer Reviews</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="product-grid">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="no-results">
                <h2>No products found</h2>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListPage
