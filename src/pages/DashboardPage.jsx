import { useAppData } from '../data/AppDataContext'
import StatCard from '../components/Dashboard/StatCard'
import ProjectProgressRow from '../components/Dashboard/ProjectProgressRow'
import Badge from '../components/Common/Badge'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { Link } from 'react-router-dom'

function DashboardPage() {
  const { projects, tasks, loading } = useAppData()

  if (loading) return <LoadingSpinner message="Loading dashboard..." />

  const totalProjects = projects.length
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length

  // Recent tasks: sort by updatedAt descending, take 5
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  const projectName = (id) =>
    projects.find((p) => p.id === id)?.name || 'Unknown project'

  // AI recommended next task: first non-completed high-priority task
  const recommended =
    tasks.find((t) => t.priority === 'High' && t.status !== 'Completed') ||
    tasks.find((t) => t.status !== 'Completed')

  return (
    <div className="page">
      <section className="stat-grid">
        <StatCard label="Total Projects" value={totalProjects} icon="📁" tone="primary" />
        <StatCard label="Total Tasks" value={totalTasks} icon="✅" tone="secondary" />
        <StatCard label="Pending Tasks" value={pendingTasks} icon="⏳" tone="warning" />
        <StatCard label="In Progress" value={inProgressTasks} icon="🚧" tone="info" />
        <StatCard label="Completed Tasks" value={completedTasks} icon="🎉" tone="success" />
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Project Progress</h2>
        </div>
        <div className="card-body">
          {projects.map((project) => {
            const pTasks = tasks.filter((t) => t.projectId === project.id)
            const done = pTasks.filter((t) => t.status === 'Completed').length
            const percent = pTasks.length
              ? Math.round((done / pTasks.length) * 100)
              : 0
            return (
              <ProjectProgressRow
                key={project.id}
                project={project}
                totalTasks={pTasks.length}
                completedTasks={done}
                percent={percent}
              />
            )
          })}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Tasks</h2>
          <Link to="/tasks" className="card-link">View all</Link>
        </div>
        <div className="card-body">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((t) => (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{projectName(t.projectId)}</td>
                    <td><Badge value={t.priority} kind="priority" /></td>
                    <td><Badge value={t.status} kind="status" /></td>
                    <td>{t.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">AI Recommended Next Task</h2>
        </div>
        <div className="card-body">
          {recommended ? (
            <div className="recommend-card">
              <div className="recommend-info">
                <span className="recommend-project">
                  {projectName(recommended.projectId)}
                </span>
                <h3 className="recommend-task">{recommended.title}</h3>
                <p className="recommend-reason">
                  This is the highest-priority incomplete task across your projects.
                  Completing it first will unblock dependent work.
                </p>
              </div>
              <Link to="/ai-mentor" className="btn btn-primary">
                View Recommendation
              </Link>
            </div>
          ) : (
            <p className="muted">No pending tasks to recommend. Great work!</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
