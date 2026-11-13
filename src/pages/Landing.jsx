import { Link } from 'react-router-dom'


function Landing() {

    const features = [
        { icon: '🎟️', title: 'Log every event', text: 'Festivals, concerts and raves.' },
        { icon: '⭐', title: 'Rate every set', text: 'Track your highlights of the night.' },
        { icon: '🏆', title: 'Rank your artists', text: 'See who you love most.' },
    ]
    return (
        <div>
            <header className="landing-header">
                <span className="logo"><img src="/logo.svg" alt="festilogo" width="36" height="36" /></span>
                <nav>
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>
            <div className="hero">
                <h1>FestiLog</h1>
                <p className="tagline">Log every set. Rank every artist. Relive every night.</p>
                <p classname="pitch">Track the festivals, concerts and raves you've been to, rate every set, and see who your favorite artists really are.</p>
            </div>
            <div className="features-cards">
                {features.map(f => (
                    <div className="card" key={f.title}>
                    <div className="feature-icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                    </div>
                ))}
            </div>
            <footer className="landing-footer">
                <h2>Ready to start logging?</h2>
                <Link to="/register" className="btn-primary">Create your account</Link>
                <p>Built by Amanda Wong · <a href="https://github.com/amawong/festiLog">GitHub</a></p>
            </footer>
        </div>
    )
}

export default Landing