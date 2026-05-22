import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Errorhandle/ErrorBoundary';
import './index.css'

import App from './App.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
const AdminExecutive = lazy(() => import('./pages/AdminExecutive.jsx'));
const AdminComments = lazy(() => import('./pages/AdminComments.jsx'));
const AdminMessages = lazy(() => import('./pages/AdminMessages.jsx'));
const AdminAnnouncements = lazy(() => import('./pages/AdminAnnouncements.jsx'));
const AdminTestimonials = lazy(() => import('./pages/AdminTestimonial.jsx'));
const AdminSettings = lazy(() => import('./pages/AdminSettings.jsx'));
const AdminProfilePage = lazy(() => import('./pages/AdminProfilePage.jsx'));


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
          // Admin Routes (protected)
          { path: '/admin', element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> },
          { path: '/admin/users', element: <ProtectedRoute><AdminUsers /></ProtectedRoute> },
          { path: '/admin/categories', element: <ProtectedRoute><AdminCategories /></ProtectedRoute> },
          { path: '/admin/posts', element: <ProtectedRoute><AdminPosts /></ProtectedRoute> },
          { path: '/admin/posts/new', element: <ProtectedRoute><NewArticlePage /></ProtectedRoute> },
          { path: '/admin/posts/:mode/:id', element: <ProtectedRoute><NewArticlePage /></ProtectedRoute> },
          { path: '/admin/events', element: <ProtectedRoute><AdminEvents /></ProtectedRoute> },
          { path: '/admin/gallery', element: <ProtectedRoute><AdminGallery /></ProtectedRoute> },
          { path: '/admin/executive', element: <ProtectedRoute><AdminExecutive /></ProtectedRoute> },
          { path: '/admin/comments', element: <ProtectedRoute><AdminComments /></ProtectedRoute> },
          { path: '/admin/messages', element: <ProtectedRoute><AdminMessages /></ProtectedRoute> },
          { path: '/admin/announcements', element: <ProtectedRoute><AdminAnnouncements /></ProtectedRoute> },
          { path: '/admin/testimonials', element: <ProtectedRoute><AdminTestimonials /></ProtectedRoute> },
          { path: '/admin/settings', element: <ProtectedRoute><AdminSettings /></ProtectedRoute> },
          { path: '/admin/profile', element: <ProtectedRoute><AdminProfilePage /></ProtectedRoute> }
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
    <RouterProvider router={router} />
  </StrictMode>,
)
