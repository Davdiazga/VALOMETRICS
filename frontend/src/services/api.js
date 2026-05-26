import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

export async function getPlayer(name, tag) {
  const { data } = await api.get(`/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`)
  return data
}

export async function getStoredPlayers() {
  const { data } = await api.get('/players')
  return data
}

export async function getPlayerMatches(name, tag) {
  const { data } = await api.get(`/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/matches`)
  return data
}

export default api
