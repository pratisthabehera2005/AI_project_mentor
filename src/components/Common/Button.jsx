// Small reusable button with variant + optional left icon.
function Button({ variant = 'primary', type = 'button', onClick, children, className = '', ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
