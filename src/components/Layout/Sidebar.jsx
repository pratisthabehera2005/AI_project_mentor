import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/projects', label: 'Projects', icon: '📁' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/ai-mentor', label: 'AI Mentor', icon: '🤖' },
  { to: '/ai-history', label: 'AI History', icon: '🕒' },
]

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay for mobile - closes the drawer when tapped */}
      {open && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden="true">🤖</span>
          <span className="sidebar-title">AI Project Mentor</span>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">Frontend Demo</p>
          <p className="sidebar-footer-sub">Mock data mode</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
