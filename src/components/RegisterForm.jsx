import api from "../api/client";
import { useState } from 'react';

function RegisterForm({ onSwitch }) {
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
          setError(e.response?.data?.error || 'Could not create account')
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Welcome to FestiLog!</h2>
        <input
          type="email"
          required autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          required 
            minLength={8}
            autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input 
          type="password"
          required autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
      <p className="account-login">
        Already have an account?{' '}
        <button type="button" className="login-btn" onClick={onSwitch}>Login</button>
      </p>
      </div>
  )
}

export default RegisterForm
