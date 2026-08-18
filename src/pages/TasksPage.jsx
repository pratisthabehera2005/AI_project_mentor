import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppData } from '../data/AppDataContext'
import TaskForm from '../components/Tasks/TaskForm'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import ErrorMessage from '../components/Common/ErrorMessage'
import EmptyState from '../components/Common/EmptyState'
import Badge from '../components/Common/Badge'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Pending', 'In Progress', 'Completed']

function TasksPage() {
  const { search } = useOutletContext()
  const {
    projects,
    tasks,
    addTask,
    updateTask,
    updateTaskStatus,
    removeTask,
  } = useAppData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [filterProject, setFilterProject] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const projectName = (id) =>
    projects.find((p) => p.id === id)?.name || 'Unknown'

  // Apply filters + search locally.
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterProject && t.projectId !== Number(filterProject)) return false
      if (filterPriority && t.priority !== filterPriority) return false
      if (filterStatus && t.status !== filterStatus) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tasks, filterProject, filterPriority, filterStatus, search])

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (task) => {
    setEditing(task)
    setModalOpen(true)
  }

  const handleSubmit = (data) => {
    try {
      if (editing) {
        updateTask(editing.id, data)
        setSuccess('Task updated successfully.')
      } else {
        addTask(data)
        setSuccess('Task created successfully.')
      }
      setModalOpen(false)
      setEditing(null)
    } catch {
      setError('Task could not be saved. Please try again.')
    }
  }

  const confirmDelete = () => {
    try {
      removeTask(deleteTarget.id)
      setSuccess('Task deleted successfully.')
    } catch {
      setError('Task could not be deleted.')
    }
    setDeleteTarget(null)
  }

  const clearFilters = () => {
    setFilterProject('')
    setFilterPriority('')
    setFilterStatus('')
  }

  return (
    <div className="page">
      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}
      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="page-toolbar">
        <p className="page-subtitle">All development tasks</p>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Task</button>
      </div>

      <div className="filters">
        <div className="form-field">
          <label className="form-label" htmlFor="filter-project">Project</label>
          <select
            id="filter-project"
            className="form-input"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            className="form-input"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All priorities</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="form-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn btn-ghost" onClick={clearFilters}>Clear</button>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          message="Try adjusting filters or add a new task."
          actionLabel="Add Task"
          onAction={openCreate}
        />
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((t) => (
                  <tr key={t.id}>
                    <td>#{t.id}</td>
                    <td><strong>{t.title}</strong></td>
                    <td>{projectName(t.projectId)}</td>
                    <td className="cell-truncate" title={t.description}>{t.description}</td>
                    <td><Badge value={t.priority} kind="priority" /></td>
                    <td>
                      <select
                        className="status-select"
                        value={t.status}
                        onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                        aria-label="Change task status"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>{t.aiGenerated ? '🤖' : '—'}</td>
                    <td>{t.createdAt}</td>
                    <td>{t.updatedAt}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}>Edit</button>
                        <button className="btn btn-danger-ghost btn-sm" onClick={() => setDeleteTarget(t)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Edit Task' : 'Add Task'}
        onClose={() => setModalOpen(false)}
        size="md"
      >
        <TaskForm
          initial={editing}
          projects={projects}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editing ? 'Update Task' : 'Save Task'}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default TasksPage
