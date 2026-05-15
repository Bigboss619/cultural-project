import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
            { title: 'Total Posts', value: '567', icon: FileText, color: 'green' },
            { title: 'Revenue', value: '$12,345', icon: TrendingUp, color: 'purple' },
            { title: 'Growth', value: '+23%', icon: BarChart3, color: 'orange' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
              green: 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400',
              purple: 'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
              orange: 'bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
            };

            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-slate-700 last:border-0"
                >
                  <div>
                    <p className="font-medium">Activity {item}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2 hours ago
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Users</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    75%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Posts</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    60%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Revenue</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    45%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;