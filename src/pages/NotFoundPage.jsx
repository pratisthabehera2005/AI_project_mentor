import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-text">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
    </div>
  )
}

export default NotFoundPage
