function ErrorMessage({ message, onRetry }) {
  return (
    <div className="glass-card p-6 text-center animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-muted mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary text-sm px-6 py-2">
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
