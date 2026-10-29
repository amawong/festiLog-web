import api from "../api/client";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()         // prevents page from refreshing on form submit
        try {
            const res = await api.post('/api/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    )
}

export default Login