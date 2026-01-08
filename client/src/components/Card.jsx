import './Card.css'

function Card({ children, className = '', hover = true, onClick }) {
  const classes = `card ${hover ? 'card-hover' : ''} ${onClick ? 'card-clickable' : ''} ${className}`.trim()
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
