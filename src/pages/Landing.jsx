import WaveBackground from "../components/WaveBackground"
import Modal from "../components/Modal"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import Navbar from '../components/Navbar'
import { useState } from 'react'

const features = [
        { icon: '🎟️', title: 'Log every event', text: 'Festivals, Concerts and Raves.' },
        { icon: '⭐', title: 'Rate every set', text: 'Track your highlights of the night.' },
        { icon: '🏆', title: 'Rank your artists', text: 'See who you love most.' },
    ]

function Landing() {

    
    const [authModal, setAuthModal] = useState(null)

    return (
        <div>
            <Navbar 
                variant="landing"
                onLogin={() => setAuthModal('login')}
                onRegister={() => setAuthModal('register')}
            />

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

            {/* FOOTER */}

            <footer className="landing-footer">
                <div className="footer-top">
                    <h2>Ready to start logging?</h2>
                    <button type="button" className="btn-primary" onClick={() => setAuthModal('register')}>Create Account</button>
                </div>
                <div className="footer-links">
                    <p>Built by Amanda Wong · </p>
                    <a href="https://github.com/amawong/festiLog" target="_blank" rel="noopener noreferrer"><img src="/github.png" alt="GitHub" width="36" height="36" /></a> · 
                    <a href="https://linkedin.com/in/amandawong10" target="_blank" rel="noopener noreferrer"><img src="/linkedin.png" alt="LinkedIn" width="36" height="36" /></a>
                    
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