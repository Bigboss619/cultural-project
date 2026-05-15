import React from 'react';
import EventsAdminEventCard from './EventsAdminEventCard';
import { EVENTS_ADMIN_EXAMPLES } from './eventsAdminMockData';

export default function EventsAdminExamples({ horizontal = false }) {
  return (
    <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-3">Examples</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Mock events shown to help admins visualize the final layout.
      </p>

      {horizontal ? (
        <div className="flex gap-4">
          {EVENTS_ADMIN_EXAMPLES.map((event) => (
            <div key={event.id} className="min-w-[340px]">
              <EventsAdminEventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {EVENTS_ADMIN_EXAMPLES.map((event) => (
            <EventsAdminEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}


