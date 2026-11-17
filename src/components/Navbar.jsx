import { Link } from 'react-router-dom'

function Navbar({ variant = 'app', onLogin, onRegister }) {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src="/logo.svg" alt="FestiLogo" width="36" height="36" />
            </Link>

            <div className="nav-links">
                {variant === 'landing' ? (
                    <>
                        <button type="button" className="header-login" onClick={onLogin}>Login</button>
                        <button type="button" className="header-register" onClick={onRegister}>Register</button>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
                        <Link to="/artists" className="artist-link">Artists</Link>
                        <Link to="/events" className="event-link">Events</Link>
                        <button type="button" className="logout" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar