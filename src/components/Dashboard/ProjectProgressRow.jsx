import { Link } from 'react-router-dom'

// Row in the Project Progress list showing a per-project progress bar.
function ProjectProgressRow({ project, totalTasks, completedTasks, percent }) {
  return (
    <div className="progress-row">
      <div className="progress-row-head">
        <Link to={`/projects/${project.id}`} className="progress-row-name">
          {project.name}
        </Link>
        <span className="progress-row-stack">{project.techStack.join(', ')}</span>
      </div>
      <div className="progress-row-meta">
        <span className="progress-row-count">{completedTasks}/{totalTasks} tasks</span>
        <span className="progress-row-percent">{percent}%</span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProjectProgressRow
