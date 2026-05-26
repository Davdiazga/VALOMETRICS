import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredPlayers } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const rankColor = (rank) => {
  if (!rank) return 'bg-muted'
  const name = rank.toLowerCase()
  if (name.includes('radiante')) return 'bg-yellow-400'
  if (name.includes('inmortal')) return 'bg-red-400'
  if (name.includes('ascendant')) return 'bg-orange-400'
  if (name.includes('diamond')) return 'bg-blue-400'
  if (name.includes('plat')) return 'bg-teal-400'
  if (name.includes('gold')) return 'bg-yellow-500'
  if (name.includes('silver')) return 'bg-gray-400'
  if (name.includes('bronze')) return 'bg-amber-700'
  if (name.includes('iron')) return 'bg-gray-600'
  return 'bg-muted'
}

function History() {
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStoredPlayers()
      .then(setPlayers)
      .catch((err) => setError(err.response?.data?.detail || 'Error al cargar el historial'))
      .finally(() => setLoading(false))
  }, [])

  function handleClick(player) {
    navigate('/dashboard', { state: { fromHistory: true, storedPlayer: player } })
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="glass-card p-8">
          <LoadingSpinner size="lg" />
          <p className="text-muted text-sm mt-4">Cargando historial...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <ErrorMessage message={error} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-slide-up mb-8">
        <h1 className="text-3xl font-poppins font-bold text-white mb-2">Historial</h1>
        <p className="text-muted">
          {players.length} jugador{players.length !== 1 ? 'es' : ''} buscado{players.length !== 1 ? 's' : ''}
        </p>
      </div>

      {players.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-muted text-lg mb-2">No hay jugadores en el historial</p>
          <p className="text-muted/60 text-sm">Busca un jugador para que aparezca aquí</p>
          <div className="mt-6 px-4 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm text-left">
            <p className="font-medium mb-1">¿Buscaste un jugador y no aparece?</p>
            <p>Asegúrate de tener PostgreSQL corriendo:</p>
            <code className="block mt-1 text-xs bg-black/20 px-2 py-1 rounded">
              docker compose up -d
            </code>
            <p className="mt-1">Luego vuelve a buscar el jugador para que se guarde.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => {
            const lastStat = player.stats?.[0]
            return (
              <div
                key={player.id}
                onClick={() => handleClick(player)}
                className="glass-card p-5 hover:border-primary/20 hover:bg-[#1e2a36] transition-all duration-300 animate-slide-up group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-poppins font-bold text-primary">
                      {player.riot_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {player.riot_name}
                      <span className="text-muted font-normal text-sm ml-1">
                        #{player.riot_tag}
                      </span>
                    </h3>
                    <p className="text-muted text-xs">
                      {player.region?.toUpperCase() || '??'} &middot; Nivel {player.account_level || '?'}
                    </p>
                  </div>
                </div>
                {lastStat && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${rankColor(lastStat.rank)}`} />
                    <span className="text-white font-medium">{lastStat.rank || 'Unranked'}</span>
                    {lastStat.rr !== null && lastStat.rr !== undefined && (
                      <span className="text-muted text-xs">{lastStat.rr} RR</span>
                    )}
                  </div>
                )}
                <p className="text-muted/50 text-xs mt-2">
                  {new Date(player.last_updated).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default History
