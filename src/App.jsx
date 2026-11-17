import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Artists from './pages/Artists'
import Landing from './pages/Landing'
import AppLayout from './components/AppLayout'
import './index.css'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Landing />} />
      
      {/* Logged In */}
      <Route element={token ? <AppLayout /> : <Navigate to="/" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/artists" element={<Artists />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
  )
}

export default App