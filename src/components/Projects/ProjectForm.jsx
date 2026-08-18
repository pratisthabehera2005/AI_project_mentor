import { useState } from 'react'

// Reusable form for creating or editing a project.
// `initial` is optional; when provided the form acts as an edit form.
function ProjectForm({ initial, onSubmit, onCancel, submitLabel = 'Save Project' }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    techStack: initial?.techStack?.join(', ') || '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Project name is required.'
    if (!form.description.trim()) next.description = 'Description is required.'
    if (!form.techStack.trim()) next.techStack = 'Technology stack is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      techStack: form.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="project-name" className="form-label">Project Name</label>
        <input
          id="project-name"
          type="text"
          className="form-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="project-desc" className="form-label">Project Description</label>
        <textarea
          id="project-desc"
          className="form-input form-textarea"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          aria-invalid={!!errors.description}
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="project-stack" className="form-label">Technology Stack</label>
        <input
          id="project-stack"
          type="text"
          className="form-input"
          placeholder="React, FastAPI, SQL Server"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          aria-invalid={!!errors.techStack}
        />
        {errors.techStack && <span className="form-error">{errors.techStack}</span>}
        <span className="form-hint">Separate technologies with commas.</span>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}

export default ProjectForm
