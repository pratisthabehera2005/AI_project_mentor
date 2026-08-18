function ErrorMessage({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="message message-error" role="alert">
      <span className="message-icon" aria-hidden="true">!</span>
      <span className="message-text">{message}</span>
      {onDismiss && (
        <button className="message-close" onClick={onDismiss} aria-label="Dismiss error">
          ×
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
