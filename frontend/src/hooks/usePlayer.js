import { useState } from 'react'
import { getPlayer } from '../services/api'

export function usePlayer() {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(name, tag) {
    setLoading(true)
    setError(null)
    setPlayer(null)
    try {
      const data = await getPlayer(name, tag)
      setPlayer(data)
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else if (err.code === 'ERR_NETWORK') {
        setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
      } else {
        setError('Error al buscar el jugador.')
      }
    } finally {
      setLoading(false)
    }
  }

  return { player, loading, error, search }
}
