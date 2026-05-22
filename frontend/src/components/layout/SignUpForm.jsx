import { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';
import API_URL from '../../config/api';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const validatePasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Full name must be at least 2 characters';
      }
    }

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
        error = 'Password must be at least 8 characters';
      } else if (!validatePasswordStrength(value)) {
        error = 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    }

    if (name === 'agreeTerms') {
      if (!value) {
        error = 'You must agree to the terms and conditions';
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
    const isFullNameValid = validateField('fullName', formData.fullName);
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    const isConfirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
    const isAgreeTermsValid = validateField('agreeTerms', formData.agreeTerms);

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isAgreeTermsValid
    ) {
      return;
    }

    setIsLoading(true);

    try {
      // const response = await axios.post(`${API_BASE}/api/auth/register`, {
      const response = await axios.post(`${API_URL}/auth/register`, {
        // backend expects `name`, not `fullName`
        name: formData.fullName,
        email: formData.email,
        password: formData.password
        // role is optional; backend defaults it to `user` if omitted
        // role: 'user',
      });


      setSuccessMessage(
        response?.data?.message ||
          'Signup successful! Please check your email to verify your account.'
      );

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });
      setTouched({});
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Signup failed. Please try again.';

      setErrors((prev) => ({
        ...prev,
        submit: `❌ ${message}`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>

      {errors.submit && <div className="error-alert">{errors.submit}</div>}
      {successMessage && <div className="success-alert">{successMessage}</div>}

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.fullName && touched.fullName ? 'input-error' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.fullName && touched.fullName && (
          <span className="error-message">{errors.fullName}</span>
        )}
      </div>

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
          placeholder="Enter a strong password"
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <div className="password-hint">
          <small>Must contain uppercase, lowercase, number, and special character</small>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${
            errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''
          }`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="agreeTerms">
          I agree to the{' '}
          <a href="#terms" className="terms-link">
            Terms and Conditions
          </a>
        </label>
        {errors.agreeTerms && touched.agreeTerms && (
          <span className="error-message">{errors.agreeTerms}</span>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}
