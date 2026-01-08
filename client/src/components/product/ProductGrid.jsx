import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid({ products, sponsored = false }) {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} sponsored={sponsored} />
      ))}
    </div>
  )
}

export default ProductGrid
