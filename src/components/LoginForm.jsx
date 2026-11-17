import api from "../api/client";
import { useState } from 'react';

function LoginForm({ onSwitch }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()         // prevents page from refreshing on form submit
        try {
            const res = await api.post('/api/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            window.location.href = '/dashboard'

        } catch (e) {
            setError('Invalid email or password')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Welcome back!</h2>
                <input
                    type="email"
                    required autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input 
                    type="password"
                    required autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
            <p className="account-register">
                Don't have an account?{' '}
                <button type="button" className="register-btn" onClick={onSwitch}>Register</button> 
            </p>
        </div>
    )
}

export default LoginForm
