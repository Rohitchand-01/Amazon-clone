import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import SearchBar from './SearchBar'
import './Header.css'

function Header() {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const { cartItems } = useCart()
  const navigate = useNavigate()
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header">
      {/* Top Navigation Bar */}
      <div className="header-top">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <span className="logo-text">amazon</span>
          </Link>

          {/* Delivery Location */}
          <div className="header-deliver-to">
            <span className="deliver-to-label">Deliver to</span>
            <span className="deliver-to-location">
              <span className="location-icon">📍</span>
              <span>India</span>
            </span>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Account & Lists */}
          <div 
            className="header-account"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}
          >
            <div className="account-link">
              <span className="account-hello">Hello, sign in</span>
              <span className="account-text">Account & Lists</span>
            </div>
            {showAccountMenu && (
              <div className="account-dropdown">
                <div className="account-dropdown-section">
                  <button className="account-signin-btn">Sign in</button>
                  <p className="account-new-customer">
                    New customer? <Link to="/">Start here.</Link>
                  </p>
                </div>
                <div className="account-dropdown-divider"></div>
                <div className="account-dropdown-links">
                  <Link to="/">Your Account</Link>
                  <Link to="/">Your Orders</Link>
                  <Link to="/">Your Lists</Link>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <Link to="/" className="header-returns">
            <span className="returns-label">Returns</span>
            <span className="returns-text">& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="header-cart">
            <div className="cart-icon-wrapper">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartCount}</span>
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="header-secondary">
        <div className="header-container">
          <div className="secondary-nav">
            <button className="nav-all-menu">
              <span>☰</span> All
            </button>
            <Link to="/search?category=electronics">Electronics</Link>
            <Link to="/search?category=books">Books</Link>
            <Link to="/search?category=home">Home & Kitchen</Link>
            <Link to="/search?category=clothing">Clothing</Link>
            <Link to="/search?category=sports">Sports & Outdoors</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
