function StatCard({ label, value, icon, trend, color = 'primary' }) {
  const colors = {
    primary: 'text-primary',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  }

  return (
    <div className="glass-card p-6 hover:border-primary/20 transition-all duration-300 group animate-slide-up">
      <div className="flex items-start justify-between mb-2">
        <span className="text-muted text-sm font-medium">{label}</span>
        {icon && (
          <span className={`text-2xl ${colors[color] || colors.primary} group-hover:scale-110 transition-transform`}>
            {icon}
          </span>
        )}
      </div>
      <div className={`stat-value ${colors[color] || colors.primary}`}>
        {value}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-1 text-xs ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
          </svg>
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  )
}

export default StatCard
