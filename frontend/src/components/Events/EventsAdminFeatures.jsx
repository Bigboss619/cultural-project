import React from 'react';
import { EVENTS_ADMIN_FEATURES } from './eventsAdminMockData';

export default function EventsAdminFeatures() {
  return (
    <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-3">Features</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Tools to manage events end-to-end (mocked for now).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EVENTS_ADMIN_FEATURES.map((f) => (
          <div
            key={f.id}
            className="p-4 rounded-lg bg-gray-50/70 dark:bg-slate-900/30 border border-gray-200/60 dark:border-slate-700"
          >
            <div className="font-semibold text-[#1A1A1A] dark:text-white">{f.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

