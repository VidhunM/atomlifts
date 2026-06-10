import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import '../index.css';
import { API_BASE_URL } from '../config';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Prepare payload - some backends expect 'email' instead of 'username'
      const payload = {
        password: password
      };
      
      // If it looks like an email, send it as both email and username
      // to cover different backend implementations
      if (username.includes('@')) {
        payload.email = username.trim();
        payload.username = username.trim();
      } else {
        payload.username = username.trim();
        // Also send as email just in case the backend uses 'email' field for the username
        payload.email = username.trim();
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      // Improved logging for debugging
       console.log('Login attempt:', {
         identifier: username.trim(),
         payloadKeys: Object.keys(payload),
         status: response.status,
         ok: response.ok,
         data: data
       });

      // Be more flexible with the success condition
      // Many backends just return 200 OK and a token if successful
      if (response.ok && (data.success !== false)) {
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          navigate('/admin');
        } else {
          setError('Login succeeded but no token was received.');
        }
      } else {
        // Show the specific error message from the backend if available
        const errorMsg = data.message || data.error || data.success === false && 'Invalid credentials' || `Login failed (${response.status}).`;
        setError(errorMsg);
        console.error('Login error details:', errorMsg);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card card bg-dark border-secondary shadow-lg">
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary p-3 rounded-circle mb-3">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="text-white fw-bold mb-0">Admin Portal</h2>
          <p className="text-secondary mt-1">Sign in to access dashboard</p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center bg-danger text-white border-0 py-2 mb-4" role="alert">
            <AlertCircle size={18} className="me-2 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3 position-relative">
            <label className="form-label text-secondary">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <User size={18} />
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ focus: { borderColor: '#0d6efd' } }}
              />
            </div>
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a href="/" className="text-secondary text-decoration-none hover-text-primary" style={{ fontSize: '0.9rem' }}>
            &larr; Back to Main Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
