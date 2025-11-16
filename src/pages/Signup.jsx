import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same CSS for simplicity

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Simple validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (captcha.trim().toLowerCase() !== 'sql') {
      setError('Captcha incorrect. Type "SQL" to verify.');
      return;
    }

    // Get existing users
    const existing = JSON.parse(localStorage.getItem('sqlrunner_users') || '[]');

    // Check if username already exists
    if (existing.some(u => u.username === username)) {
      setError('Username already exists. Try another one.');
      return;
    }

    // Save new user
    const newUser = { username, password };
    localStorage.setItem('sqlrunner_users', JSON.stringify([...existing, newUser]));

    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up for <span className="brand">SQLRunner</span></h2>
        <form onSubmit={handleSignup}>
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
          <input
            placeholder='Enter "SQL" to verify'
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
