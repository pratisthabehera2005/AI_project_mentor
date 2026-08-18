function SuccessMessage({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="message message-success" role="status">
      <span className="message-icon" aria-hidden="true">✓</span>
      <span className="message-text">{message}</span>
      {onDismiss && (
        <button className="message-close" onClick={onDismiss} aria-label="Dismiss message">
          ×
        </button>
      )}
    </div>
  )
}

export default SuccessMessage
