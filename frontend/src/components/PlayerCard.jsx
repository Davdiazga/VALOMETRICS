function PlayerCard({ player }) {
  if (!player) return null

  const { account, rank } = player
  const currentTier = rank?.current?.tier?.name || 'Unranked'
  const peakTier = rank?.peak?.tier?.name || null
  const rr = rank?.current?.rr

  return (
    <div className="glass-card p-6 w-full max-w-md mx-auto animate-slide-up">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-poppins font-bold text-primary">
            {account?.name?.charAt(0) || '?'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">
            {account?.name || 'Jugador'}
            <span className="text-muted font-normal text-base ml-1">
              #{account?.tag || '??'}
            </span>
          </h3>
          <p className="text-muted text-sm">
            {account?.region?.toUpperCase() || '??'} &middot; Nivel {account?.account_level || '?'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-card border border-white/5">
        <div className={`w-3 h-3 rounded-full ${currentTier !== 'Unranked' ? 'bg-yellow-400' : 'bg-muted'}`} />
        <span className="text-white font-semibold">{currentTier}</span>
        {rr !== undefined && rr !== null && (
          <span className="text-muted text-sm">{rr} RR</span>
        )}
        {peakTier && (
          <span className="text-muted text-xs ml-auto">Peak: {peakTier}</span>
        )}
      </div>
    </div>
  )
}

export default PlayerCard
