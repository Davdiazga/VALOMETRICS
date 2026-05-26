function DashboardCard({ title, children, className = '' }) {
  return (
    <div className={`glass-card p-6 animate-slide-up ${className}`}>
      {title && (
        <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}

export default DashboardCard
