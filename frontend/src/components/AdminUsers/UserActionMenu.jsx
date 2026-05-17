import React from 'react';
import { MoreVertical } from 'lucide-react';

const UserActionMenu = ({ user, actions }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAction = (handler) => {
    handler(user);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-[100] overflow-visible">


          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleAction(action.handler)}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <Icon size={16} className={`text-${action.color}-600 dark:text-${action.color}-400`} />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserActionMenu;
