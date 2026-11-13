import { Link } from 'react-router-dom'

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="logo">
                <img src="/logo.svg" alt="festilogo" width="36" height="36" />
            </Link>
            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/events">Events</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar