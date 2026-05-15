import React from 'react';
import { Plus } from 'lucide-react';

const UserHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all users in the system
        </p>
      </div>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
        <Plus size={20} />
        Add User
      </button>
    </div>
  );
};

export default UserHeader;
