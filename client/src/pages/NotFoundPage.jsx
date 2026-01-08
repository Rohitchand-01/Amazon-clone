import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/">
            <Button variant="primary">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
