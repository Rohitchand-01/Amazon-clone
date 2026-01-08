import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </div>
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Get to Know Us</h3>
            <ul>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">About Amazon</a></li>
              <li><a href="/">Investor Relations</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Make Money with Us</h3>
            <ul>
              <li><a href="/">Sell products on Amazon</a></li>
              <li><a href="/">Sell on Amazon Business</a></li>
              <li><a href="/">Sell apps on Amazon</a></li>
              <li><a href="/">Become an Affiliate</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Amazon Payment Products</h3>
            <ul>
              <li><a href="/">Amazon Business Card</a></li>
              <li><a href="/">Shop with Points</a></li>
              <li><a href="/">Reload Your Balance</a></li>
              <li><a href="/">Amazon Currency Converter</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Need Help?</h3>
            <ul>
              <li><a href="/">COVID-19 and Amazon</a></li>
              <li><a href="/">Your Account</a></li>
              <li><a href="/">Your Orders</a></li>
              <li><a href="/">Shipping Rates & Policies</a></li>
              <li><a href="/">Returns & Replacements</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-logo">
            <span className="logo-text">amazon</span>
          </div>
          <div className="footer-links">
            <a href="/">Conditions of Use</a>
            <a href="/">Privacy Notice</a>
            <a href="/">Interest-Based Ads</a>
          </div>
          <div className="footer-copyright">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
