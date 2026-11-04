import { useState, useEffect } from 'react'
import api from '../api/client'
import Navbar from '../components/Navbar'

function Dashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        api.get('/api/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err))
    }, [])  // [] means "run once component loads"
    
    // const handleLogout = () => {
    //     localStorage.removeItem('token')
    //     window.location.href = '/login'
    // }

    if (!stats) return <div>Loading...</div> 
    
    return (
        <div>
            <Navbar />
            <p>Events: {stats.eventsCount}</p>
            <p>Artists: {stats.artistsCount}</p>
            <p>Sets: {stats.setsCount}</p>
            <p>Average Rating: {stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}</p>
        </div>
    )
}

export default Dashboard