import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { createOrder } from '../services/api'
import Input from '../components/Input'
import Button from '../components/Button'
import './CheckoutPage.css'

function CheckoutPage() {
  const { cartItems, getTotalPrice, loadCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState(null)

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (stepNum) => {
    const newErrors = {}
    
    if (stepNum === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    }
    
    if (stepNum === 2) {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return
    
    try {
      setLoading(true)
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`
      
      const order = await createOrder({
        shippingAddress,
        totalAmount: total,
      })
      
      setOrderId(order.id)
      setStep(4)
      await loadCart() // Clear cart
    } catch (error) {
      alert('Failed to place order. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <h1>Your cart is empty</h1>
            <p>Add items to your cart to proceed to checkout.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        
        {/* Progress Indicator */}
        <div className="checkout-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="checkout-step">
                <h2>Shipping Address</h2>
                <div className="form-grid">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    error={errors.fullName}
                    fullWidth
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    error={errors.address}
                    fullWidth
                  />
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    error={errors.city}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    error={errors.state}
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    error={errors.zipCode}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    error={errors.phone}
                    fullWidth
                  />
                </div>
                <div className="form-actions">
                  <Button variant="primary" onClick={handleNext}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="checkout-step">
                <h2>Payment Method</h2>
                <div className="form-grid">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    error={errors.cardNumber}
                    fullWidth
                  />
                  <Input
                    label="Cardholder Name"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    error={errors.cardName}
                    fullWidth
                  />
                  <Input
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    error={errors.expiryDate}
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    type="password"
                    required
                    error={errors.cvv}
                  />
                </div>
                <div className="form-actions">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="checkout-step">
                <h2>Review Your Order</h2>
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <p>
                    {formData.fullName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zipCode}<br />
                    {formData.country}
                  </p>
                </div>
                <div className="review-section">
                  <h3>Payment Method</h3>
                  <p>
                    Card ending in {formData.cardNumber.slice(-4)}<br />
                    {formData.cardName}
                  </p>
                </div>
                <div className="form-actions">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="secondary" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && (
              <div className="checkout-step checkout-confirmation">
                <h2>Order Confirmed!</h2>
                <div className="confirmation-message">
                  <p>Thank you for your order!</p>
                  <p>Your order number is: <strong>#{orderId}</strong></p>
                  <p>You will receive an email confirmation shortly.</p>
                </div>
                <div className="form-actions">
                  <Button variant="primary" onClick={() => navigate('/')}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step < 4 && (
            <div className="checkout-summary">
              <div className="summary-box">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>{item.product.name}</span>
                      <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider"></div>
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-line summary-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
