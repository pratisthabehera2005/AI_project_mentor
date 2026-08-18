import { useState } from 'react'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Pending', 'In Progress', 'Completed']

// Reusable form for creating or editing a task.
function TaskForm({ initial, projects, onSubmit, onCancel, submitLabel = 'Save Task' }) {
  const [form, setForm] = useState({
    projectId: initial?.projectId || (projects[0]?.id ?? ''),
    title: initial?.title || '',
    description: initial?.description || '',
    priority: initial?.priority || 'Medium',
    status: initial?.status || 'Pending',
    aiGenerated: initial?.aiGenerated || false,
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.projectId) next.projectId = 'Please select a project.'
    if (!form.title.trim()) next.title = 'Task title is required.'
    if (!form.description.trim()) next.description = 'Task description is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="task-project" className="form-label">Select Project</label>
        <select
          id="task-project"
          className="form-input"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: Number(e.target.value) })}
          aria-invalid={!!errors.projectId}
        >
          <option value="">Select a project...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && <span className="form-error">{errors.projectId}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="task-title" className="form-label">Task Title</label>
        <input
          id="task-title"
          type="text"
          className="form-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          aria-invalid={!!errors.title}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="task-desc" className="form-label">Task Description</label>
        <textarea
          id="task-desc"
          className="form-input form-textarea"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          aria-invalid={!!errors.description}
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="task-priority" className="form-label">Priority</label>
          <select
            id="task-priority"
            className="form-input"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="task-status" className="form-label">Status</label>
          <select
            id="task-status"
            className="form-input"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field form-check-field">
        <label className="form-check">
          <input
            type="checkbox"
            checked={form.aiGenerated}
            onChange={(e) => setForm({ ...form, aiGenerated: e.target.checked })}
          />
          <span>AI Generated</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}

export default TaskForm
