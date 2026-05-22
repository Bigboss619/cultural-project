import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config/api';

import './LoginForm.css';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

export default function LoginForm() {
  const navigate = useNavigate(); // ✅ For redirect
  const location = useLocation();
  const [expiredMessage, setExpiredMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.reason === 'session_expired') {
      setExpiredMessage('Your session has expired due to inactivity. Please login again.');
      window.history.replaceState({}, document.title, '/login');
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address';
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (!validatePassword(value)) {
        error = 'Password must be at least 6 characters';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate all fields
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const resp = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = resp.data || {};

      if (!token) {
        throw new Error('No token returned from server');
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user?.role);
      localStorage.setItem('lastActivity', Date.now().toString());

      setSuccessMessage('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.message ||
        'Invalid email or password';

      console.error('Login error:', error?.response?.data || error);

      setErrors((prev) => ({
        ...prev,
        submit: `❌ ${message}`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Admin Login</h2>
      
      {/* ✅ DEFAULT CREDENTIALS HINT */}
      {/* <div className="credential-hint">
        <div className="hint-box">
          <strong>Demo Credentials:</strong><br />
          📧 <code>admin@legacy.com</code><br />
          🔑 <code>admin123</code>
        </div>
      </div> */}

      {errors.submit && <div className="error-alert">{errors.submit}</div>}
      {successMessage && <div className="success-alert">{successMessage}</div>}
      {expiredMessage && <div className="success-alert">{expiredMessage}</div>}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
          placeholder="admin@legacy.com"
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
          placeholder="admin123"
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Logging in...
          </span>
        ) : (
          'Login to Admin'
        )}
      </button>

      <div className="form-footer">
        <a href="#forgot-password" className="forgot-link">Forgot password?</a>
      </div>
    </form>
  );
}