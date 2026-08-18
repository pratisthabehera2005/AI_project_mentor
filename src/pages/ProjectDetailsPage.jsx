import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useAppData } from '../data/AppDataContext'
import ProjectForm from '../components/Projects/ProjectForm'
import Modal from '../components/Common/Modal'
import Badge from '../components/Common/Badge'
import EmptyState from '../components/Common/EmptyState'
import LoadingSpinner from '../components/Common/LoadingSpinner'

function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projectById, tasksForProject, updateProject, loading } = useAppData()
  const [editOpen, setEditOpen] = useState(false)

  if (loading) return <LoadingSpinner message="Loading project..." />

  const project = projectById(id)

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        message="The project you are looking for does not exist."
        actionLabel="Back to Projects"
        onAction={() => navigate('/projects')}
      />
    )
  }

  const projectTasks = tasksForProject(id)
  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const total = projectTasks.length
  const percent = total ? Math.round((completed / total) * 100) : 0

  const handleUpdate = (data) => {
    updateProject(project.id, data)
    setEditOpen(false)
  }

  return (
    <div className="page">
      <div className="page-toolbar">
        <button className="btn btn-ghost" onClick={() => navigate('/projects')}>
          ← Back to Projects
        </button>
        <div className="page-toolbar-actions">
          <Link to="/tasks" className="btn btn-secondary">+ Add Task</Link>
          <button className="btn btn-secondary" onClick={() => setEditOpen(true)}>
            Edit Project
          </button>
          <Link to="/ai-mentor" className="btn btn-primary">Ask AI Mentor</Link>
        </div>
      </div>

      <section className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">{project.name}</h2>
            <span className="muted">Created {project.createdAt} · #{project.id}</span>
          </div>
          <span className="progress-pill">{percent}%</span>
        </div>
        <div className="card-body">
          <p className="project-detail-desc">{project.description}</p>
          <div className="project-detail-stack">
            {project.techStack.map((tech) => (
              <Badge key={tech} value={tech} kind="tech" />
            ))}
          </div>
          <div className="progress-bar progress-bar-lg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="project-detail-stats">
            <div><strong>{total}</strong> Total Tasks</div>
            <div><strong>{completed}</strong> Completed</div>
            <div><strong>{total - completed}</strong> Remaining</div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Tasks</h2>
          <Link to="/tasks" className="card-link">View all tasks</Link>
        </div>
        <div className="card-body">
          {projectTasks.length === 0 ? (
            <EmptyState title="No tasks yet" message="Add a task to start tracking progress." />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>AI</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTasks.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <strong>{t.title}</strong>
                        <div className="muted small">{t.description}</div>
                      </td>
                      <td><Badge value={t.priority} kind="priority" /></td>
                      <td><Badge value={t.status} kind="status" /></td>
                      <td>{t.aiGenerated ? <span title="AI generated">🤖</span> : '—'}</td>
                      <td>{t.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Modal open={editOpen} title="Edit Project" onClose={() => setEditOpen(false)} size="md">
        <ProjectForm
          initial={project}
          onSubmit={handleUpdate}
          onCancel={() => setEditOpen(false)}
          submitLabel="Update Project"
        />
      </Modal>
    </div>
  )
}

export default ProjectDetailsPage
