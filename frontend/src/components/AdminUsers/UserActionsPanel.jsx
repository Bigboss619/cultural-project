import React from 'react';
import { Plus, UserCog, Trash2, Ban, Pencil } from 'lucide-react';

const UserActionsPanel = ({
  onAdd,
  onEdit,
  onDelete,
  onSuspend,
  onAssignRoles,
  disabled,
}) => {
  const buttonBase =
    'w-full px-4 py-2 rounded-lg border transition-colors text-sm font-medium flex items-center justify-center gap-2';

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <h2 className="text-lg font-bold mb-4">Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          className={`${buttonBase} bg-blue-600 text-white border-blue-600 hover:bg-blue-700`}
          onClick={onAdd}
        >
          <Plus size={16} /> Add user
        </button>

        <button
          className={`${buttonBase} bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onEdit}
          disabled={disabled}
        >
          <Pencil size={16} /> Edit user
        </button>

        <button
          className={`${buttonBase} bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onAssignRoles}
          disabled={disabled}
        >
          <UserCog size={16} /> Assign roles
        </button>

        <button
          className={`${buttonBase} bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onSuspend}
          disabled={disabled}
        >
          <Ban size={16} /> Suspend account
        </button>

        <button
          className={`${buttonBase} bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 sm:col-span-2 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash2 size={16} /> Delete user
        </button>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
        Mock UI only — actions update local state (no backend calls).
      </p>
    </div>
  );
};

export default UserActionsPanel;

