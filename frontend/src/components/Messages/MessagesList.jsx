import React from 'react';
import { MESSAGE_STATUS_LABELS } from './messagesMockData';

const formatDate = (iso) => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

export default function MessagesList({ threads, selectedId, onSelect, onMarkRead }) {
  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
        <h2 className="text-base font-bold text-gray-900 dark:text-slate-50">View messages</h2>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-slate-700 overflow-auto max-h-[520px]">
        {threads.length === 0 ? (
          <div className="p-4 text-gray-600 dark:text-gray-300">No messages found.</div>
        ) : (
          threads.map((t) => {
            const isSelected = t.id === selectedId;
            const status = MESSAGE_STATUS_LABELS[t.status] || { label: t.status, tone: 'blue' };
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelect(t.id)}
                className={`w-full text-left px-4 py-3 transition-colors flex gap-3 items-start ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-slate-800'
                    : 'bg-white dark:bg-slate-950 hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
              >
                <div className="pt-1">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      t.unread ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-700'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-gray-900 dark:text-slate-50 truncate">
                      {t.fromName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(t.createdAt)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-slate-200 truncate">
                    {t.subject}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        status.tone === 'emerald'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40'
                      }`}
                    >
                      {status.label}
                    </span>

                    {t.unread && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-600 text-white border border-blue-600">
                        Unread
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {!t.unread && <span className="text-xs text-gray-400 dark:text-slate-500"> </span>}
                  {t.unread && (
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">New</span>
                  )}

                  {t.unread && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkRead(t.id);
                      }}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

