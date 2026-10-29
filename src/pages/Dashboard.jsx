import { useState, useEffect } from 'react'
import api from '../api/client'

function Dashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        api.get('/api/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err))
    }, [])  // [] means "run once component loads"
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    if (!stats) return <div>Loading...</div> 
    
    return (
        <div>
            <p>Events: {stats.eventsCount}</p>
            <p>Artists: {stats.artistsCount}</p>
            <p>Sets: {stats.setsCount}</p>
            <p>Average Rating: {stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard