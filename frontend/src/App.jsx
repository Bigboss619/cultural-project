import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from './components/loader/PageLoader';

function App() {
  const [showLoader, setShowLoader] = useState(false)
  const location = useLocation();

  
  return (
    <>
      {showLoader && <PageLoader />}
      <Outlet />

    </>
  );
}

export default App
