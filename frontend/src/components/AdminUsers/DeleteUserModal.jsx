import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DeleteUserModal = ({ isOpen, user, onClose, onConfirm }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Delete User</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-semibold mb-2">Are you sure?</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                This action cannot be undone. You are about to permanently delete <strong>{user.name}</strong>'s account.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
