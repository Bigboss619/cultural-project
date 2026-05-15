import React from 'react';

export default function MessagesToolbar({ query, onQueryChange, filter, onFilterChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Search
        </label>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          type="text"
          placeholder="Search by name, email, subject..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="sm:w-64">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Filter
        </label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
}

