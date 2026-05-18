import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from './components/loader/PageLoader';

import { ToastProvider } from './components/toast';

function App() {
  const [showLoader, setShowLoader] = useState(false)
  const location = useLocation();

  return (
    <ToastProvider>
      {showLoader && <PageLoader />}
      <Outlet />
    </ToastProvider>
  );
}

export default App

