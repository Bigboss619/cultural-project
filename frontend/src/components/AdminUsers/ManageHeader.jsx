import React from 'react';

const ManageHeader = ({ title = 'Users', subtitle = 'Manage users, roles, and account status' }) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-gray-900 dark:text-gray-100">Manage:</span>
        <span className="ml-2">Admins · Editors · Members · Guests · Features</span>
      </div>
    </div>
  );
};

export default ManageHeader;

