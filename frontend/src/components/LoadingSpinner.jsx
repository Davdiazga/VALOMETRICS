function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-2 border-white/10 border-t-primary rounded-full animate-spin`}
      />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
      <div className="h-8 bg-white/10 rounded w-1/2 mb-2" />
      <div className="h-3 bg-white/5 rounded w-2/3" />
    </div>
  )
}

export function SkeletonLine({ width = 'full' }) {
  return (
    <div className={`h-4 bg-white/10 rounded animate-pulse w-${width}`} />
  )
}

export default LoadingSpinner
