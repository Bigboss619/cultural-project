import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Errorhandle/ErrorBoundary';
import './index.css'

import App from './App.jsx'

// Admin New Article (Tiptap page)
const NewArticlePage = lazy(() => import('./pages/NewArticle.jsx'));



// Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const GalleryPage = lazy(() => import('./pages/Gallery.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
// const BlogDetails = lazy(() => import('./components/Blog/BlogDetails.jsx'));
const BlogDetails = lazy(() => import('./pages/BlogDetails.jsx'));
const Membership = lazy(() => import('./pages/Membership.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const AdminUsers = lazy(() => import('./pages/Users.jsx'));
const AdminCategories = lazy(() => import('./pages/Categories.jsx'));
const AdminPosts = lazy(() => import('./pages/Posts.jsx'));
const AdminEvents = lazy(() => import('./pages/AdminEvents.jsx'));
const AdminGallery = lazy(() => import('./pages/AdminGallery.jsx'));
const AdminVideos = lazy(() => import('./pages/AdminVideos.jsx'));
const AdminComments = lazy(() => import('./pages/AdminComments.jsx'));
const AdminMessages = lazy(() => import('./pages/AdminMessages.jsx'));
const AdminAnnouncements = lazy(() => import('./pages/AdminAnnouncements.jsx'));
const AdminDonations = lazy(() => import('./pages/AdminDonations.jsx'));
const AdminSettings = lazy(() => import('./pages/AdminSettings.jsx'));


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
        { path: '/gallery', element: <GalleryPage /> },
        { path: '/events', element: <Events /> },
        { path: '/blog', element: <Blog />},
        { path: '/blog/:slug', element: <BlogDetails /> },
        { path: '/membership', element: <Membership />},
        { path: '/pricing', element: <Pricing />},
        { path: '/login', element: <Login /> },
          // Admin Routes
          { path: '/admin', element: <AdminDashboard /> },
          { path: '/admin/users', element: <AdminUsers /> },
          { path: '/admin/categories', element: <AdminCategories /> },
          { path: '/admin/posts', element: <AdminPosts /> },
          { path: '/admin/posts/new', element: <NewArticlePage /> },
          { path: '/admin/posts/:mode/:id', element: <NewArticlePage /> },

          { path: '/admin/events', element: <AdminEvents /> },
          { path: '/admin/gallery', element: <AdminGallery /> },
          { path: '/admin/videos', element: <AdminVideos /> },
          { path: '/admin/comments', element: <AdminComments /> },
          { path: '/admin/messages', element: <AdminMessages /> },
          { path: '/admin/announcements', element: <AdminAnnouncements /> },
          { path: '/admin/donations', element: <AdminDonations /> },
          { path: '/admin/settings', element: <AdminSettings /> }
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
