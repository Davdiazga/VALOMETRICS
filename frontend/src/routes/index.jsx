import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import SearchPlayer from '../pages/SearchPlayer'
import Dashboard from '../pages/Dashboard'
import History from '../pages/History'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPlayer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
