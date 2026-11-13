import api from "../api/client";
import { useState } from 'react';
import { Link } from "react-router-dom";

function Login() {
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
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
            <p className="account-register">Don't have an account? <Link to="/register">Register</Link></p>
        </div>

    )
}

export default Login