import { Link } from 'react-router-dom'

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="logo">
                <img src="/logo.svg" alt="festilogo" width="36" height="36" />
            </Link>
            <div className="nav-links">
                <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
                <Link to="/artists" className="artist-link">Artists</Link>
                <Link to="/events" className="event-link">Events</Link>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar