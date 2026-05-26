import { useState } from 'react'

function SearchPlayerForm({ onSearch, loading }) {
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (name && tag) onSearch(name, tag)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1.5">
            Riot Name
          </label>
          <input
            type="text"
            placeholder="Ej: DarkShadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-1.5">
            Riot Tag
          </label>
          <input
            type="text"
            placeholder="Ej: EUW"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !name || !tag}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analizando...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Analizar
          </>
        )}
      </button>
    </form>
  )
}

export default SearchPlayerForm
