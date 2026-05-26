function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`glass-card p-6 animate-slide-up ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-muted text-xs">Temporada actual</span>
        </div>
      </div>
      {children}
    </div>
  )
}

export default ChartCard
