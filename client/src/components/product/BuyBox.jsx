import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import Button from '../Button'
import Badge from '../Badge'
import './BuyBox.css'

function BuyBox({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const { addItem } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    try {
      setAdding(true)
      await addItem(product.id, quantity)
      setAdding(false)
      // Show success message (could be a toast notification)
    } catch (error) {
      setAdding(false)
      alert('Failed to add item to cart')
    }
  }

  const handleBuyNow = async () => {
    try {
      setAdding(true)
      await addItem(product.id, quantity)
      setAdding(false)
      navigate('/checkout')
    } catch (error) {
      setAdding(false)
      alert('Failed to add item to cart')
    }
  }

  const inStock = product.stockQuantity > 0
  const price = parseFloat(product.price)
  const listPrice = product.listPrice ? parseFloat(product.listPrice) : null

  return (
    <div className="buy-box">
      <div className="buy-box-price">
        {listPrice && listPrice > price && (
          <div className="price-list">
            List: <span className="price-list-value">${listPrice.toFixed(2)}</span>
          </div>
        )}
        <div className="price-current">
          ${price.toFixed(2)}
        </div>
        {listPrice && listPrice > price && (
          <div className="price-savings">
            You Save: ${(listPrice - price).toFixed(2)} ({(100 - (price / listPrice * 100)).toFixed(0)}%)
          </div>
        )}
      </div>

      {product.isPrime && (
        <div className="buy-box-prime">
          <Badge variant="prime">Prime</Badge>
          <span className="prime-benefit">FREE delivery</span>
        </div>
      )}

      <div className="buy-box-stock">
        {inStock ? (
          <span className="stock-in">In Stock</span>
        ) : (
          <span className="stock-out">Out of Stock</span>
        )}
      </div>

      <div className="buy-box-quantity">
        <label htmlFor="quantity-select">Quantity:</label>
        <select
          id="quantity-select"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="quantity-select"
          disabled={!inStock}
        >
          {[...Array(Math.min(30, product.stockQuantity || 30))].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="buy-box-actions">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleAddToCart}
          disabled={!inStock || adding}
          className="btn-add-to-cart"
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </Button>
        <Button
          variant="secondary"
          fullWidth
          size="lg"
          onClick={handleBuyNow}
          disabled={!inStock || adding}
          className="btn-buy-now"
        >
          Buy Now
        </Button>
      </div>

      <div className="buy-box-security">
        <span className="security-icon">🔒</span>
        <span className="security-text">Secure transaction</span>
      </div>

      <div className="buy-box-ships-from">
        <span>Ships from</span>
        <strong>Amazon</strong>
      </div>

      <div className="buy-box-sold-by">
        <span>Sold by</span>
        <strong>Amazon</strong>
      </div>
    </div>
  )
}

export default BuyBox
