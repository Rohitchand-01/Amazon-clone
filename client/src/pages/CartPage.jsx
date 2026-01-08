import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Button from '../components/Button'
import './CartPage.css'

function CartPage() {
  const { cartItems, updateItem, removeItem, getTotalPrice, loadCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    loadCart()
  }, [])

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeItem(cartItemId)
    } else {
      await updateItem(cartItemId, newQuantity)
    }
  }

  const handleDelete = async (cartItemId) => {
    if (window.confirm('Remove this item from cart?')) {
      await removeItem(cartItemId)
    }
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout')
    }
  }

  const subtotal = getTotalPrice()
  const estimatedTax = subtotal * 0.1 // 10% tax estimate
  const total = subtotal + estimatedTax

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="cart-empty">
            <h2>Your Amazon Cart is empty</h2>
            <p>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.</p>
            <Link to="/">
              <Button variant="primary">Continue shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => {
              const product = item.product
              const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0]
              
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <Link to={`/product/${product.id}`}>
                      {primaryImage && (
                        <img src={primaryImage.imageUrl} alt={product.name} />
                      )}
                    </Link>
                  </div>
                  
                  <div className="cart-item-details">
                    <Link to={`/product/${product.id}`} className="cart-item-title">
                      {product.name}
                    </Link>
                    <div className="cart-item-price">
                      ${parseFloat(product.price).toFixed(2)}
                    </div>
                    <div className="cart-item-stock">
                      {product.stockQuantity > 0 ? (
                        <span className="stock-in">In Stock</span>
                      ) : (
                        <span className="stock-out">Out of Stock</span>
                      )}
                    </div>
                    
                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <label>Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="quantity-select"
                        >
                          {[...Array(Math.min(30, product.stockQuantity || 30))].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        className="cart-item-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-total">
                    ${(parseFloat(product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              )
            })}
            
            <div className="cart-subtotal-mobile">
              Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}): 
              <strong> ${subtotal.toFixed(2)}</strong>
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="cart-summary-box">
              <div className="summary-line">
                <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}):</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="summary-line">
                <span>Estimated tax:</span>
                <strong>${estimatedTax.toFixed(2)}</strong>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-line summary-total">
                <span>Total:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleCheckout}
                className="checkout-button"
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
