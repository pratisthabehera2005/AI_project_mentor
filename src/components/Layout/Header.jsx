import { useNavigate } from 'react-router-dom'

function Header({ title, onMenuClick, search, onSearchChange }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <span className="hamburger" aria-hidden="true">☰</span>
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
        <button className="header-icon-btn" aria-label="Notifications">
          <span aria-hidden="true">🔔</span>
          <span className="header-badge" aria-hidden="true">3</span>
        </button>
        <button
          className="header-profile"
          onClick={() => navigate('/')}
          aria-label="User profile"
        >
          <span className="header-avatar" aria-hidden="true">ST</span>
          <span className="header-profile-name">Student</span>
        </button>
      </div>
    </header>
  )
}

export default Header
