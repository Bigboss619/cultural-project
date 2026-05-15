import React, { createContext, useState, useContext, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const ThemeContext = createContext();
const SidebarContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within AdminLayout');
  }
  return context;
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within AdminLayout');
  }
  return context;
};

const AdminLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('admin-theme');
    return saved ? JSON.parse(saved) : false;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Mobile: collapsed by default, Desktop: expanded by default
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const saved = localStorage.getItem('admin-sidebar-state');
      return saved ? JSON.parse(saved) : !isMobile;
    }
    return true;
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile, auto-expand on desktop
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('admin-theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('admin-sidebar-state', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isMobile }}>
        <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <AdminHeader />

            {/* Page Content */}
            <main
              className={`flex-1 overflow-auto transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-slate-900 text-slate-50'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              <div className="p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
};

export default AdminLayout;
