import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
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
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data (no API calls)
  const overview = [
    {
      title: 'Total users',
      value: '1,234',
      icon: Users,
      accent: 'blue',
    },
    {
      title: 'Total posts',
      value: '567',
      icon: FileText,
      accent: 'green',
    },
    {
      title: 'Upcoming events',
      value: '3',
      icon: Calendar,
      accent: 'orange',
      note: 'Next: Heritage Night',
    },
    {
      title: 'Recent comments',
      value: '42',
      icon: MessageSquare,
      accent: 'purple',
      note: '5 need review',
    },
    {
      title: 'Total gallery items',
      value: '214',
      icon: Image,
      accent: 'teal',
    },
  ];

  const notifications = [
    { title: 'Comment moderation', subtitle: '5 pending approvals', icon: Inbox, accent: 'blue' },
    { title: 'Event registration', subtitle: 'New RSVP on Upcoming Events', icon: Clock, accent: 'orange' },
    { title: 'Content publishing', subtitle: '2 articles published today', icon: CheckCircle2, accent: 'green' },
  ];

  const exampleCards = [
    { title: 'Total Members', value: '1,234', icon: Star, accent: 'blue' },
    { title: 'Active Events', value: '6', icon: Calendar, accent: 'orange' },
    { title: 'Published Articles', value: '48', icon: FileText, accent: 'green' },
    { title: 'Pending Comments', value: '5', icon: MessageSquare, accent: 'purple' },
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

