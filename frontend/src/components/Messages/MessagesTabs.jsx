import React from 'react';
import { MESSAGES_TABS } from './messagesMockData';

const tabButtonClass = (active) =>
  `px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
    active
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'
  }`;

export default function MessagesTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className={tabButtonClass(activeTab === MESSAGES_TABS.MESSAGES)}
        onClick={() => onChange(MESSAGES_TABS.MESSAGES)}
      >
        Messages
      </button>
      <button
        type="button"
        className={tabButtonClass(activeTab === MESSAGES_TABS.CONTACT)}
        onClick={() => onChange(MESSAGES_TABS.CONTACT)}
      >
        Contact
      </button>
    </div>
  );
}

