import React from 'react';
import UserActionMenu from './UserActionMenu';

const UserTable = ({ users, actions }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
      <table className="w-full overflow-visible">
        <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <td className="px-6 py-3 font-medium">{user.name}</td>
              <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                {user.email}
              </td>
              <td className="px-6 py-3">
                <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : user.status === 'Suspended'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                <UserActionMenu user={user} actions={actions} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
