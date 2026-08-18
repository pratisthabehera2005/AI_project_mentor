import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppData } from '../data/AppDataContext'
import ProjectForm from '../components/Projects/ProjectForm'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import ErrorMessage from '../components/Common/ErrorMessage'
import EmptyState from '../components/Common/EmptyState'
import Badge from '../components/Common/Badge'

function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, removeProject } = useAppData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (project) => {
    setEditing(project)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    try {
      if (editing) {
        updateProject(editing.id, data)
        setSuccess('Project updated successfully.')
      } else {
        addProject(data)
        setSuccess('Project created successfully.')
      }
      setModalOpen(false)
      setEditing(null)
    } catch {
      setError('Project could not be saved. Please try again.')
    }
  }

  const confirmDelete = () => {
    try {
      removeProject(deleteTarget.id)
      setSuccess('Project deleted successfully.')
    } catch {
      setError('Project could not be deleted.')
    }
    setDeleteTarget(null)
  }

  const taskCount = (id) => tasks.filter((t) => t.projectId === id).length
  const completedCount = (id) =>
    tasks.filter((t) => t.projectId === id && t.status === 'Completed').length

  return (
    <div className="page">
      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}
      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="page-toolbar">
        <p className="page-subtitle">Manage your software projects</p>
        <button className="btn btn-primary" onClick={openCreate}>
          + Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          message="Create your first project to start tracking tasks."
          actionLabel="Create Project"
          onAction={openCreate}
        />
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-head">
                <h3 className="project-card-title">{project.name}</h3>
                <span className="project-card-id">#{project.id}</span>
              </div>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-card-stack">
                {project.techStack.map((tech) => (
                  <Badge key={tech} value={tech} kind="tech" />
                ))}
              </div>
              <div className="project-card-stats">
                <span>{taskCount(project.id)} tasks</span>
                <span>{completedCount(project.id)} completed</span>
                <span className="muted">{project.createdAt}</span>
              </div>
              <div className="project-card-actions">
                <Link to={`/projects/${project.id}`} className="btn btn-ghost btn-sm">
                  View
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(project)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger-ghost btn-sm"
                  onClick={() => setDeleteTarget(project)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Edit Project' : 'Create Project'}
        onClose={() => setModalOpen(false)}
        size="md"
      >
        <ProjectForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editing ? 'Update Project' : 'Save Project'}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? All tasks in this project will also be removed.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default ProjectsPage
