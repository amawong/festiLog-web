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

    if (!stats) return <div>Loading...</div> 
    
    return (
        <div>
            <Navbar />
            <div className="">
                <h2>Welcome to your FestiLog Dashboard!</h2>
                <div className="card-grid">
                    <div className="card stat">
                        <p className="stat-label">Events</p>
                        <p className="stat-number">{stats.eventsCount}</p>
                    </div>
                    <div className="card stat">
                        <p className="stat-label">Artists</p>
                        <p className="stat-number">{stats.artistsCount}</p>
                    </div>
                    <div className="card stat">
                        <p className="stat-label">Sets</p>
                        <p className="stat-number">{stats.setsCount}</p>
                    </div>
                    <div className="card stat">
                        <p className="stat-label">Average Rating</p>
                        <p className="stat-number">{stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard