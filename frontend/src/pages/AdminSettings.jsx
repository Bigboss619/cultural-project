import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage admin settings</p>
        </div>
        <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <p className="text-gray-600 dark:text-gray-400">Settings management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
