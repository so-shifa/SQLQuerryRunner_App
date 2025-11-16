import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same CSS for simplicity

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
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
try {
  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Signup failed");
    return;
  }

  alert("Signup successful! Please login.");
  navigate("/login");

} catch (err) {
  setError("Server error — could not reach backend");
}

  }
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
