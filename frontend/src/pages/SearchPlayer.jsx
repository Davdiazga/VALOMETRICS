import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../hooks/usePlayer'
import SearchPlayerForm from '../components/SearchPlayerForm'
import PlayerCard from '../components/PlayerCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

function SearchPlayer() {
  const navigate = useNavigate()
  const { player, loading, error, search } = usePlayer()

  function handleSearch(name, tag) {
    search(name, tag)
  }

  function handleViewDashboard() {
    navigate('/dashboard', { state: { player } })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-16 sm:pt-24">
      <div className="w-full max-w-2xl px-4">
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-3">
            Buscar Jugador
          </h1>
          <p className="text-muted text-base">
            Ingresa el Riot Name y Tag para analizar sus estadísticas
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 animate-slide-up">
          <SearchPlayerForm onSearch={handleSearch} loading={loading} />
        </div>

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="glass-card p-8">
              <LoadingSpinner size="lg" />
              <p className="text-muted text-sm mt-4 text-center">Buscando jugador...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8">
            <ErrorMessage message={error} onRetry={() => {}} />
          </div>
        )}

        {player && !loading && (
          <div className="mt-8 space-y-6">
            <PlayerCard player={player} />
            <div className="text-center">
              <button onClick={handleViewDashboard} className="btn-primary inline-flex items-center gap-2">
                Ver Dashboard Completo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPlayer
