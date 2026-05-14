import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Errorhandle/ErrorBoundary';
import './index.css'

import App from './App.jsx'

// Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const GalleryPage = lazy(() => import('./pages/Gallery.jsx'));


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <AboutUs /> },
        { path: '/contact', element: <ContactUs /> },
        { path: '/gallery', element: <GalleryPage /> }

      ],
    },
  ],
  {
    // IMPORTANT:
    // If you deploy/serve the app under /cultural-project, keep basename.
    // If you access it at the site root (e.g. http://localhost:5173/), remove basename.
    basename: import.meta.env.BASE_URL,
  }
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f3f4f6'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '5px solid #e5e7eb',
              borderTop: '5px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        }>
            <RouterProvider router={router} />
        </Suspense>
  </StrictMode>,
)
