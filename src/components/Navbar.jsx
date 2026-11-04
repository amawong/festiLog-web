import { Link } from 'react-router-dom'

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/events">Events</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar