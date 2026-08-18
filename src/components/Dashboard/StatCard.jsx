// A single summary card on the dashboard.
function StatCard({ label, value, icon, tone = 'primary' }) {
  return (
    <div className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-icon" aria-hidden="true">{icon}</div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  )
}

export default StatCard
