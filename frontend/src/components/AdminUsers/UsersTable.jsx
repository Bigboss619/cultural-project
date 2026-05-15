import React from 'react';
import { MoreVertical } from 'lucide-react';

const statusPill = (status) => {
  if (status === 'Active') {
    return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
  }
  if (status === 'Suspended') {
    return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
  }
  return 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300';
};

const UsersTable = ({ users, onEdit, onDelete, onSuspend, onAssignRoles }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
      <table className="w-full">
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
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-600 dark:text-gray-400">
                No users in this group.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="px-6 py-3 font-medium">{user.name}</td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-3">
                  <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 text-sm rounded-full ${statusPill(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => onEdit(user)}
                      title="Edit user"
                    >
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => onAssignRoles(user)}
                      title="Assign roles"
                    >
                      <span className="text-sm">Roles</span>
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => onSuspend(user)}
                      title="Suspend account"
                    >
                      <span className="text-sm">Suspend</span>
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => onDelete(user)}
                      title="Delete user"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

