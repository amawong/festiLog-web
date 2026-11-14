import { Link } from 'react-router-dom'
import WaveBackground from "../components/WaveBackground"
import Modal from "../components/Modal"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { useState } from 'react'


function Landing() {

    const features = [
        { icon: '🎟️', title: 'Log every event', text: 'Festivals, Concerts and Raves.' },
        { icon: '⭐', title: 'Rate every set', text: 'Track your highlights of the night.' },
        { icon: '🏆', title: 'Rank your artists', text: 'See who you love most.' },
    ]
    const [authModal, setAuthModal] = useState(null)

    return (
        <div>
            <header className="landing-header">
                <span className="logo"><img src="/logo.svg" alt="festilogo" width="36" height="36" /></span>
                <nav>
                    {/*<Link to="/register" className="header-about">About</Link>8*/}
                    <button type="button" className="header-login" onClick={() => setAuthModal('login')}>Login</button>
                    <button type="button" className="header-register" onClick={() => setAuthModal('register')}>Register</button>
                </nav>
            </header>
            <WaveBackground />
            <div className="hero">
                <h1>FestiLog</h1>
                <p className="tagline">Relive every set.</p>
                <p className="pitch">Your concert memories and listening stats, all in one place.</p>
            
                <div className="features-cards">
                    {features.map(f => (
                        <div className="card" key={f.title}>
                        <div className="feature-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="about">

            </div> */}
            <footer className="landing-footer">
                <div className="footer-top">
                    <h2>Ready to start logging?</h2>
                    <button type="button" className="btn-primary" onClick={() => setAuthModal('register')}>Create Account</button>
                </div>
                <div className="footer-links">
                    <p>Built by Amanda Wong · </p>
                    <a href="https://github.com/amawong/festiLog" target="_blank"><img src="/github.png" width="36" height="36" /></a> · 
                    <a href="https://linkedin.com/in/amandawong10" target="_blank"><img src="/linkedin.png" width="36" height="36" /></a>
                    
                </div>
            </footer>
            {authModal && (
            <Modal onClose={() => setAuthModal(null)}>
                {authModal === 'login'
                ? <LoginForm onSwitch={() => setAuthModal('register')} />
                : <RegisterForm onSwitch={() => setAuthModal('login')} />}
            </Modal>
            )}
        </div>
    )
}

export default Landing