import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Artists from './pages/Artists'


function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/events" element={token ? <Events /> : <Navigate to="/login" />} />
      <Route path="/events/:id" element={token ? <EventDetail /> : <Navigate to="/login" />} />
      <Route path="/artists" element={token ? <Artists /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default App