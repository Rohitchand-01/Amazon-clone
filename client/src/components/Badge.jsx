import './Badge.css'

function Badge({ children, variant = 'default', className = '' }) {
  const classes = `badge badge-${variant} ${className}`.trim()
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge
