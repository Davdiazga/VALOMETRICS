import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Plataforma de análisis competitivo
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-white leading-tight mb-6">
              Analiza tu rendimiento en{' '}
              <span className="text-gradient">Valorant</span>
            </h1>
            <p className="text-muted text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Descubre estadísticas avanzadas, analiza tu progreso y mejora tu rendimiento competitivo.
            </p>
            <Link
              to="/search"
              className="btn-primary inline-flex items-center gap-2 text-lg group"
            >
              Buscar Jugador
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-white">3+</div>
                <div className="text-muted text-xs mt-1">Agentes</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-white">10K+</div>
                <div className="text-muted text-xs mt-1">Partidas</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-white">99%</div>
                <div className="text-muted text-xs mt-1">Precisión</div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative w-full h-full rounded-2xl border border-white/10 bg-surface-secondary/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="text-center animate-float">
                  <div className="text-7xl mb-4">🎯</div>
                  <p className="text-muted text-sm">ValoMetrics</p>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-poppins font-bold text-sm">K/D</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                  <span className="text-green-400 font-poppins font-bold text-xs">WR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
