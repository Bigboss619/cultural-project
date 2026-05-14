import AuthForm from './AuthForm';

export default function AuthPage() {
  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AuthForm />
    </div>
  );
}
