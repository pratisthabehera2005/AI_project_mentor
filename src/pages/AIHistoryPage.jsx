import { useMemo, useState } from 'react'
import { useAppData } from '../data/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'
import Badge from '../components/Common/Badge'

const TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

function AIHistoryPage() {
  const { aiHistory, projects, removeAIHistory } = useAppData()
  const [filterProject, setFilterProject] = useState('')
  const [filterTaskType, setFilterTaskType] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [viewItem, setViewItem] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [success, setSuccess] = useState('')

  const filtered = useMemo(() => {
    return aiHistory.filter((h) => {
      if (filterProject && h.projectId !== Number(filterProject)) return false
      if (filterTaskType && h.taskType !== filterTaskType) return false
      if (filterDate && h.createdAt !== filterDate) return false
      return true
    })
  }, [aiHistory, filterProject, filterTaskType, filterDate])

  const confirmDelete = () => {
    removeAIHistory(deleteTarget.id)
    setSuccess('History entry deleted successfully.')
    setDeleteTarget(null)
  }

  const clearFilters = () => {
    setFilterProject('')
    setFilterTaskType('')
    setFilterDate('')
  }

  return (
    <div className="page">
      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      <div className="page-toolbar">
        <p className="page-subtitle">Previous AI mentor interactions</p>
      </div>

      <div className="filters">
        <div className="form-field">
          <label className="form-label" htmlFor="hist-project">Project</label>
          <select
            id="hist-project"
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
          <label className="form-label" htmlFor="hist-type">AI Task Type</label>
          <select
            id="hist-type"
            className="form-input"
            value={filterTaskType}
            onChange={(e) => setFilterTaskType(e.target.value)}
          >
            <option value="">All types</option>
            {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="hist-date">Date</label>
          <input
            id="hist-date"
            type="date"
            className="form-input"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost" onClick={clearFilters}>Clear</button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No interactions found" message="Try adjusting filters or generate a new AI recommendation." />
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project</th>
                  <th>User Prompt</th>
                  <th>Response Preview</th>
                  <th>Task Type</th>
                  <th>Model</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.id}>
                    <td>#{h.id}</td>
                    <td><strong>{h.projectName}</strong></td>
                    <td className="cell-truncate" title={h.userPrompt}>{h.userPrompt}</td>
                    <td className="cell-truncate" title={h.responsePreview}>{h.responsePreview}</td>
                    <td><Badge value={h.taskType} kind="tech" /></td>
                    <td><span className="badge badge-tech-gpt-oss">{h.modelName}</span></td>
                    <td>{h.createdAt}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setViewItem(h)}>
                          View
                        </button>
                        <button
                          className="btn btn-danger-ghost btn-sm"
                          onClick={() => setDeleteTarget(h)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={!!viewItem} title="AI Interaction" onClose={() => setViewItem(null)} size="lg">
        {viewItem && (
          <div className="ai-detail">
            <div className="ai-detail-row"><strong>Project:</strong> {viewItem.projectName}</div>
            <div className="ai-detail-row"><strong>Task Type:</strong> {viewItem.taskType}</div>
            <div className="ai-detail-row"><strong>Model:</strong> {viewItem.modelName}</div>
            <div className="ai-detail-row"><strong>Date:</strong> {viewItem.createdAt}</div>
            <div className="ai-detail-section">
              <strong>User Prompt</strong>
              <p>{viewItem.userPrompt}</p>
            </div>
            <div className="ai-detail-section">
              <strong>AI Response</strong>
              <p>{viewItem.responsePreview}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete History"
        message="Are you sure you want to delete this AI interaction record?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default AIHistoryPage
