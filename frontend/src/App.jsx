import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from './components/loader/PageLoader';

import { ToastProvider } from './components/toast';
import { AuthProvider } from './context/AuthContext';
import TimeoutWarning from './components/TimeoutWarning/TimeoutWarning';

function App() {
  const [showLoader, setShowLoader] = useState(false)
  const location = useLocation();

  return (
    <ToastProvider>
      <AuthProvider>
        {showLoader && <PageLoader />}
        <Outlet />
        <TimeoutWarning />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App

