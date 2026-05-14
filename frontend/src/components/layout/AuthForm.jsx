import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthForm.css';

export default function AuthForm() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="auth-form-container">
      {/* Toggle Buttons */}
      <div className="auth-toggle-buttons">
        <button
          className={`toggle-btn ${!isFlipped ? 'active' : ''}`}
          onClick={() => setIsFlipped(false)}
        >
          Login
        </button>
        <button
          className={`toggle-btn ${isFlipped ? 'active' : ''}`}
          onClick={() => setIsFlipped(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Flip Container */}
      <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
        {/* Login Form (Front) */}
        <div className="flip-front">
          <LoginForm />
        </div>

        {/* Signup Form (Back) */}
        <div className="flip-back">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
