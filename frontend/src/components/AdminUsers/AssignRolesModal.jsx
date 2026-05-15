import React from 'react';
import { X } from 'lucide-react';

const AVAILABLE_ROLES = ['Admin', 'Moderator', 'User', 'Viewer'];

const AssignRolesModal = ({ isOpen, user, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = React.useState(user?.role || 'User');

  React.useEffect(() => {
    setSelectedRole(user?.role || 'User');
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, selectedRole);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Assign Roles</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              User: <strong>{user.name}</strong>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Select Role</label>
            <div className="space-y-2">
              {AVAILABLE_ROLES.map(role => (
                <label key={role} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <strong>Role Permissions:</strong><br />
              • Admin: Full access to all features<br />
              • Moderator: Can manage content and users<br />
              • User: Can create and edit content<br />
              • Viewer: Read-only access
            </p>
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
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Assign Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignRolesModal;
