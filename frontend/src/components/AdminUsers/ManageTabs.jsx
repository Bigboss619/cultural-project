import React from 'react';
import { Users, Settings, Shield, Pencil, UserRound, Sparkles } from 'lucide-react';

const iconMap = {
  Admins: Shield,
  Editors: Pencil,
  Members: UserRound,
  Guests: Users,
  Features: Sparkles,
};

const ManageTabs = ({ activeTab, onChange }) => {
  const tabs = ["Admins", "Editors", "Members", "Guests", "Features"];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const Icon = iconMap[tab] || Settings;
        const active = tab === activeTab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 text-sm font-medium ${
              active
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icon size={16} className="opacity-90" />
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default ManageTabs;

