import api from "../api/client";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()         // prevents page from refreshing on form submit
        try {
            const res = await api.post('/api/auth/register', { email, username, password })
            localStorage.setItem('token', res.data.token)
            window.location.href = '/dashboard'

        } catch (e) {
            setError('Invalid email or password')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Register</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    )
}

export default Register