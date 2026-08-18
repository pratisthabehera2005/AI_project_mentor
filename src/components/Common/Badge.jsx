// Reusable badge for priority and status values.
// colour maps to a CSS class so colours stay consistent app-wide.
function Badge({ value, kind = 'status' }) {
  const normalised = String(value || '').toLowerCase().replace(/\s+/g, '-')
  const className = `badge badge-${kind}-${normalised}`
  return <span className={className}>{value}</span>
}

export default Badge
