import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Titles for each route so the header reflects the current page.
const routeTitles = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()

  // Match /projects/:id under "Projects" title
  const title =
    routeTitles[location.pathname] ||
    (location.pathname.startsWith('/projects/') ? 'Project Details' : 'Page')

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen((v) => !v)}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="app-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  )
}

export default Layout
