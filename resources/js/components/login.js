import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      await login(email, password, remember);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-login">
      <div className="login-card">
        <div className="card-hero">
          <img src="/images/hcc-logo.png.png" alt="Logo" className="brand-logo" />
          <h1>SFMS Management System</h1>
        </div>
        {msg && <div className="message error">{msg}</div>}
        <form onSubmit={submit}>
          <label className="input-group">
            <span className="icon" aria-hidden>👤</span>
            <input
              type="email"
              placeholder="Enter username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label className="input-group">
            <span className="icon" aria-hidden>🔒</span>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <div className="controls">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}