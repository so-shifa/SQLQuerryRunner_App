import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css'; // 👈 we’ll add a clean style file

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 👇 Step 1: Retrieve all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('sqlrunner_users') || '[]');
    const foundUser = registeredUsers.find(u => u.username === username && u.password === password);

    // 👇 Step 2: Validate login
    if (!foundUser) {
      setError('Invalid username or password. Please sign up first.');
      return;
    }

    // 👇 Step 3: If found, log them in
    login(username);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome to <span className="brand">SQLRunner</span></h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="switch">New here? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
