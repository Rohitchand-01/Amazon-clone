import './LoadingSpinner.css'

function LoadingSpinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle"></div>
    </div>
  )
}

export default LoadingSpinner
