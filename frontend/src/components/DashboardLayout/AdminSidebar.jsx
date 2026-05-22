import React from 'react';
import { useSidebar, useTheme } from './AdminLayout';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Layers,
  FileText,
  Calendar,
  Image,
  Video,
  MessageSquare,
  Mail,
  Megaphone,
  Heart,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const { isSidebarOpen, toggleSidebar, isMobile } = useSidebar();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: '/admin/users',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Layers,
      path: '/admin/categories',
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: FileText,
      path: '/admin/posts',
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      path: '/admin/events',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: Image,
      path: '/admin/gallery',
    },
    {
      id: 'executive',
      label: 'Executive',
      icon: Video,
      path: '/admin/executive',
    },
    {
      id: 'comments',
      label: 'Comments',
      icon: MessageSquare,
      path: '/admin/comments',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: Mail,
      path: '/admin/messages',
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Megaphone,
      path: '/admin/announcements',
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: Heart,
      path: '/admin/testimonials',
    },
    {
      id: 'membership',
      label: 'Members',
      icon: Users,
      path: '/admin/membership',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } border-r transition-all duration-300 ease-in-out flex flex-col h-screen overflow-y-auto fixed md:relative z-40 md:z-auto`}
      >
        {/* Sidebar Header */}
        <div
          className={`p-4 border-b ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          } flex items-center justify-between`}
        >
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white font-bold`}>
                A
              </div>
              <h1 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Admin
              </h1>
            </div>
          )}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-colors`}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => isMobile && toggleSidebar()}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                  active
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600'
                    : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active
                      ? 'text-current'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-slate-200'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {isSidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div
          className={`p-3 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          } mt-auto`}
        >
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userRole');
              navigate('/');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isDarkMode
                ? 'text-red-400 hover:bg-slate-700 hover:text-red-300'
                : 'text-red-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-sm font-medium whitespace-nowrap">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button (on Header) */}
      {!isSidebarOpen && isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50 md:hidden"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default AdminSidebar;
