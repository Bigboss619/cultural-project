import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus } from 'lucide-react';

const Announcements = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Create and manage announcements</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            New Announcement
          </button>
        </div>
        <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <p className="text-gray-600 dark:text-gray-400">Announcements management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Announcements;
