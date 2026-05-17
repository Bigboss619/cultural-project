import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this import
import './LoginForm.css';

// ✅ DEFAULT CREDENTIALS
const DEFAULT_CREDENTIALS = {
  email: 'admin@legacy.com',
  password: 'admin123'
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

export default function LoginForm() {
  const navigate = useNavigate(); // ✅ For redirect
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

    // ✅ MOCK AUTHENTICATION (2 second delay for realism)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // ✅ CHECK DEFAULT CREDENTIALS
      if (
        formData.email === DEFAULT_CREDENTIALS.email &&
        formData.password === DEFAULT_CREDENTIALS.password
      ) {
        // ✅ SUCCESS: Store mock token & redirect
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userRole', 'admin');
        
        setSuccessMessage('Login successful! Redirecting...');
        
        // ✅ REDIRECT TO /admin AFTER 1 SECOND
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
        
        return;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: '❌ Invalid email or password. Try: admin@legacy.com / admin123',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Admin Login</h2>
      
      {/* ✅ DEFAULT CREDENTIALS HINT */}
      <div className="credential-hint">
        <div className="hint-box">
          <strong>Demo Credentials:</strong><br />
          📧 <code>admin@legacy.com</code><br />
          🔑 <code>admin123</code>
        </div>
      </div>

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