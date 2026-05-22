import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import { useTheme, useSidebar } from './AdminLayout';

import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  LogOut,
  Settings,
  User,
  ChevronDown,
  MessageSquare,
  Mail,
} from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [notifications, setNotifications] = useState({
    unreadMessages: 0,
    pendingComments: 0,
    recentMessages: [],
    recentComments: [],
  });

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const fetchNotifications = async () => {
    if (!authToken) return;

    try {
      const resp = await api.get('/dashboard/stats', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setNotifications({
        unreadMessages: resp.data.unreadMessages || 0,
        pendingComments: resp.data.pendingComments || 0,
        recentMessages: resp.data.recentMessagesList || [],
        recentComments: resp.data.recentCommentsList || [],
      });
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const fetchProfile = async () => {
    if (!authToken) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    setProfileError('');
    try {
      const resp = await api.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setProfile(resp?.data?.user || null);
    } catch (err) {
      setProfile(null);
      setProfileError(err?.response?.data?.message || 'Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Refresh notifications periodically (every 60 seconds)
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [authToken]);

  const displayName = profile?.name || 'Admin';
  const displayEmail = profile?.email || 'admin@example.com';

  // Generate breadcrumb from location

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/admin' }];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      if (path !== 'admin') {
        breadcrumbs.push({
          label: path.charAt(0).toUpperCase() + path.slice(1),
          path: currentPath,
        });
      }
    });

    return breadcrumbs.length > 1
      ? breadcrumbs.slice(-1)[0]
      : { label: 'Dashboard', path: '/admin' };
  };

  const currentPage = getBreadcrumbs();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header
      className={`h-16 border-b ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      } sticky top-0 z-30 transition-colors duration-300`}
    >
      <div className="h-full px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Section - Toggle & Breadcrumb */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-700 text-slate-300'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm min-w-0">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
              Admin
            </span>
            <ChevronDown size={16} className={isDarkMode ? 'text-slate-500' : 'text-gray-400'} />
            <span
              className={`font-medium truncate ${
                isDarkMode ? 'text-slate-200' : 'text-gray-700'
              }`}
            >
              {currentPage.label}
            </span>
          </div>
        </div>

        {/* Right Section - Search, Theme Toggle, Notifications, User Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-opacity-50 transition-colors duration-200"
            style={{
              backgroundColor: isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(229, 231, 235, 0.7)'
            }}
          >
            <Search size={18} className={isDarkMode ? 'text-slate-400' : 'text-gray-500'} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-0 outline-none text-sm w-40 placeholder-opacity-70 ${
                isDarkMode
                  ? 'text-slate-200 placeholder-slate-500'
                  : 'text-gray-700 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Notifications Icon */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowNotificationMenu(true)}
              className={`p-2 rounded-lg transition-colors relative ${
                isDarkMode
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Bell size={20} />
              {notifications.unreadMessages + notifications.pendingComments > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold px-1">
                  {notifications.unreadMessages + notifications.pendingComments > 99
                    ? '99+'
                    : notifications.unreadMessages + notifications.pendingComments}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationMenu && (
              <div
                onMouseLeave={() => setShowNotificationMenu(false)}
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-white'
                }`}
              >
                <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {/* Unread Messages Section */}
                  <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-100'}`}>
                    <Link
                      to="/admin/messages"
                      onClick={() => setShowNotificationMenu(false)}
                      className={`flex items-center justify-between text-sm ${
                        isDarkMode ? 'text-slate-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Mail size={16} />
                        Unread Messages
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        notifications.unreadMessages > 0
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-500 dark:bg-slate-600 dark:text-slate-400'
                      }`}>
                        {notifications.unreadMessages}
                      </span>
                    </Link>
                  </div>

                  {/* Pending Comments Section */}
                  <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-100'}`}>
                    <Link
                      to="/admin/comments"
                      onClick={() => setShowNotificationMenu(false)}
                      className={`flex items-center justify-between text-sm ${
                        isDarkMode ? 'text-slate-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare size={16} />
                        Pending Comments
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        notifications.pendingComments > 0
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
                          : 'bg-gray-100 text-gray-500 dark:bg-slate-600 dark:text-slate-400'
                      }`}>
                        {notifications.pendingComments}
                      </span>
                    </Link>
                  </div>

                  {/* No Notifications State */}
                  {notifications.unreadMessages === 0 && notifications.pendingComments === 0 && (
                    <div className={`px-4 py-6 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      <Bell size={24} className="mx-auto mb-2 opacity-50" />
                      No new notifications
                    </div>
                  )}
                </div>

                <div className={`px-4 py-2 border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} text-center`}>
                  <Link
                    to="/admin/messages"
                    onClick={() => setShowNotificationMenu(false)}
                    className={`text-xs font-medium ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    View all messages
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-700 text-slate-300'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {(displayName?.[0] || 'A').toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {displayName}
              </span>


              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-white'
                }`}
              >
                <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {displayName === 'Admin' ? 'Admin User' : displayName}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {displayEmail}
                  </p>

                </div>


                <Link
                  to="/admin/profile"
                  className={`w-full px-4 py-2 flex items-center gap-2 text-left text-sm transition-colors ${
                    isDarkMode
                      ? 'text-slate-300 hover:bg-slate-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={16} />
                  My Profile
                </Link>

                <button
                  className={`w-full px-4 py-2 flex items-center gap-2 text-left text-sm transition-colors ${
                    isDarkMode
                      ? 'text-slate-300 hover:bg-slate-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={16} />
                  Settings
                </button>

                <div className={`border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} mt-2 pt-2`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 flex items-center gap-2 text-left text-sm transition-colors ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-slate-600'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close User Menu on Outside Click */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
      {/* Close Notification Menu on Outside Click */}
      {showNotificationMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotificationMenu(false)}
        />
      )}
    </header>
  );
};

export default AdminHeader;
