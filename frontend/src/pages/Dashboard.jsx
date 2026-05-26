import { useLocation, Navigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from 'recharts'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'

const winRateData = [
  { month: 'Ene', winRate: 52 },
  { month: 'Feb', winRate: 55 },
  { month: 'Mar', winRate: 48 },
  { month: 'Abr', winRate: 61 },
  { month: 'May', winRate: 58 },
  { month: 'Jun', winRate: 64 },
]

const agentData = [
  { agent: 'Jett', kd: 1.42, wins: 68 },
  { agent: 'Reyna', kd: 1.38, wins: 62 },
  { agent: 'Sage', kd: 1.12, wins: 55 },
  { agent: 'Phoenix', kd: 1.28, wins: 58 },
  { agent: 'Omen', kd: 1.05, wins: 51 },
]

const mapData = [
  { map: 'Ascent', winRate: 65 },
  { map: 'Bind', winRate: 58 },
  { map: 'Haven', winRate: 72 },
  { map: 'Split', winRate: 45 },
  { map: 'Icebox', winRate: 55 },
  { map: 'Breeze', winRate: 60 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e2a36] border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-white text-sm font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-muted text-xs">
            {entry.name}: <span className="text-white">{entry.value}{entry.name === 'Win Rate' ? '%' : ''}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Dashboard() {
  const location = useLocation()
  const state = location.state

  if (!state) {
    return <Navigate to="/search" replace />
  }

  const { fromHistory, storedPlayer, player } = state

  let displayName, displayTag, displayRegion, displayLevel, displayRank, displayRR

  if (fromHistory && storedPlayer) {
    const s = storedPlayer
    displayName = s.riot_name
    displayTag = s.riot_tag
    displayRegion = s.region
    displayLevel = s.account_level
    const lastStat = s.stats?.[0]
    displayRank = lastStat?.rank || 'Unranked'
    displayRR = lastStat?.rr
  } else if (player) {
    displayName = player.account?.name
    displayTag = player.account?.tag
    displayRegion = player.account?.region
    displayLevel = player.account?.account_level
    displayRank = player.rank?.current?.tier?.name || 'Unranked'
    displayRR = player.rank?.current?.rr
  } else {
    return <Navigate to="/search" replace />
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-poppins font-bold text-primary">
                  {displayName?.charAt(0) || '?'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-white">
                  {displayName || 'Jugador'}
                  <span className="text-muted font-normal text-xl ml-2">
                    #{displayTag || '??'}
                  </span>
                </h1>
                <p className="text-muted text-sm">
                  {displayRegion?.toUpperCase() || '??'} &middot; Nivel {displayLevel || '?'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#1e2a36] border border-white/5">
            <div className={`w-3 h-3 rounded-full ${displayRank !== 'Unranked' ? 'bg-yellow-400' : 'bg-muted'}`} />
            <span className="text-white font-semibold">{displayRank}</span>
            {displayRR !== null && displayRR !== undefined && (
              <span className="text-muted text-sm">{displayRR} RR</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Win Rate" value="64.2%" color="primary" trend={5.2} icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        } />
        <StatCard label="KDA" value="1.42" color="green" trend={3.1} icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        } />
        <StatCard label="Headshot %" value="28.5%" color="yellow" trend={-1.2} icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
          </svg>
        } />
        <StatCard label="Partidas" value="298" color="blue" trend={12.8} icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        } />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolución Win Rate">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={winRateData}>
              <defs>
                <linearGradient id="winRateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4655" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF4655" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[30, 80]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="winRate" name="Win Rate" stroke="#FF4655" fill="url(#winRateGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Rendimiento por Agente">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={agentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={false} />
              <XAxis type="number" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="agent" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="wins" name="Victorias" fill="#FF4655" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Rendimiento por Mapa">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="map" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="winRate" name="Win Rate" fill="#FF4655" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="KDA por Agente">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={agentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={false} />
              <XAxis type="number" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 2]} />
              <YAxis type="category" dataKey="agent" stroke="#768079" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="kd" name="KDA" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

export default Dashboard
