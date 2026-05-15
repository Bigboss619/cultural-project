import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const SuspendAccountModal = ({ isOpen, user, onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason);
    setReason('');
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Suspend Account</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Suspending <strong>{user.name}</strong> will temporarily disable their account. They won't be able to access the system.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reason for Suspension</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for suspending this account..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              rows="4"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              Suspend Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuspendAccountModal;
