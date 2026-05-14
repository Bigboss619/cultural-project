import { useState } from 'react';
import './LoginForm.css';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
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
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Login successful!');
        setFormData({ email: '', password: '' });
        setTouched({});
        // Handle redirect or token storage here
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: 'Login failed. Please check your credentials.',
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: 'An error occurred. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      {errors.submit && <div className="error-alert">{errors.submit}</div>}
      {successMessage && <div className="success-alert">{successMessage}</div>}

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
          placeholder="Enter your email"
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
          placeholder="Enter your password"
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className="form-footer">
        <a href="#forgot-password" className="forgot-link">Forgot password?</a>
      </div>
    </form>
  );
}
