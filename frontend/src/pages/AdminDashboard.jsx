import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import api from '../config/axios';
import {
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Image,
  Bell,
  Star,
  Clock,
  CheckCircle2,
  Inbox,
  Mail,
  TrendingUp,
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 py-8">{error}</div>
      </AdminLayout>
    );
  }

  const overview = [
    {
      title: 'Total users',
      value: stats?.totalUsers || 0,
      icon: Users,
      accent: 'blue',
    },
    {
      title: 'Total posts',
      value: stats?.totalPosts || 0,
      icon: FileText,
      accent: 'green',
    },
    {
      title: 'Upcoming events',
      value: stats?.upcomingEvents || 0,
      icon: Calendar,
      accent: 'orange',
      note: stats?.nextEvent ? `Next: ${stats.nextEvent.title}` : 'None scheduled',
    },
    {
      title: 'Recent comments',
      value: stats?.recentComments || 0,
      icon: MessageSquare,
      accent: 'purple',
      note: stats?.pendingComments ? `${stats.pendingComments} need review` : 'All reviewed',
    },
    {
      title: 'Total gallery items',
      value: stats?.totalGalleryItems || 0,
      icon: Image,
      accent: 'teal',
    },
  ];

  const notifications = [
    { title: 'Unread messages', subtitle: `${stats?.unreadMessages || 0} new messages`, icon: Mail, accent: 'blue' },
    { title: 'Pending comments', subtitle: `${stats?.pendingComments || 0} need review`, icon: Inbox, accent: 'purple' },
    { title: 'Upcoming events', subtitle: `${stats?.upcomingEvents || 0} events scheduled`, icon: Calendar, accent: 'orange' },
  ];

  const exampleCards = [
    { title: 'Approved testimonials', value: stats?.approvedTestimonials || 0, icon: Star, accent: 'blue' },
    { title: 'Total posts', value: stats?.totalPosts || 0, icon: FileText, accent: 'green' },
    { title: 'Total users', value: stats?.totalUsers || 0, icon: Users, accent: 'orange' },
    { title: 'Pending comments', value: stats?.pendingComments || 0, icon: MessageSquare, accent: 'purple' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400',
    orange: 'bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    teal: 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of your platform at a glance.
          </p>
        </div>

        {/* Overview Page */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main overview cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {overview.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
                      <p className="text-2xl font-bold mt-2">{item.value}</p>
                      {item.note && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.note}</p>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[item.accent]}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Notifications (as requested Overview item) */}
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm sm:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notifications</p>
                  <p className="text-2xl font-bold mt-2">{notifications.length}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses.blue}`}>
                  <Bell size={24} />
                </div>
              </div>

              <div className="space-y-3">
                {notifications.map((n, idx) => {
                  const NotifIcon = n.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{n.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{n.subtitle}</p>
                      </div>
                      <div className={`p-2 rounded-lg ${colorClasses[n.accent]}`}>
                        <NotifIcon size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: example cards */}
          <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Example Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exampleCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{card.title}</p>
                        <p className="text-2xl font-bold mt-1">{card.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg ${colorClasses[card.accent]}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

