import React, { useMemo, useState } from 'react';
import ReplyBox from './ReplyBox';
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

export default function MessageDetails({ thread, onMarkRead, onReply }) {
  const [sending, setSending] = useState(false);

  const status = useMemo(() => {
    if (!thread) return null;
    return MESSAGE_STATUS_LABELS[thread.status] || { label: thread.status, tone: 'blue' };
  }, [thread]);

  if (!thread) {
    return (
      <div className="border border-gray-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900">
        <div className="text-gray-600 dark:text-gray-300">Select a message from the list to view details.</div>
      </div>
    );
  }

  const statusPill =
    status?.tone === 'emerald'
      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40'
      : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40';

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-gray-500 dark:text-slate-400">From</div>
              <div className="font-bold text-gray-900 dark:text-slate-50">{thread.fromName}</div>
              <div className="text-sm text-gray-600 dark:text-slate-300">{thread.fromEmail}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusPill}`}>
                {status?.label}
              </span>
              <div className="text-xs text-gray-500 dark:text-slate-400 whitespace-nowrap">
                {formatDate(thread.createdAt)}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm text-gray-500 dark:text-slate-400">Subject</div>
            <div className="font-semibold text-gray-900 dark:text-slate-50">{thread.subject}</div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 dark:text-slate-400 mb-2">Message</div>
          <div className="whitespace-pre-wrap text-gray-800 dark:text-slate-100 leading-6">
            {thread.body}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {thread.unread ? (
              <button
                type="button"
                onClick={() => onMarkRead(thread.id)}
                className="px-4 py-2 rounded-lg font-semibold bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Mark as read
              </button>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
                Read
              </span>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-gray-900 dark:text-slate-50">Conversation</h3>
            <div className="mt-2 space-y-3">
              {thread.replies.map((r) => (
                <div
                  key={r.id}
                  className={`p-3 rounded-xl border ${
                    r.role === 'user'
                      ? 'bg-blue-50/60 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/40'
                      : 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900/40'
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-600 dark:text-slate-300">
                    {r.role === 'user' ? 'Sender' : 'Admin'}
                  </div>
                  <div className="text-sm whitespace-pre-wrap text-gray-800 dark:text-slate-100 mt-1">
                    {r.body}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-2">{formatDate(r.createdAt)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReplyBox
        disabled={sending}
        onReply={async (draft) => {
          setSending(true);
          try {
            await new Promise((r) => setTimeout(r, 650));
            onReply(thread.id, draft);
          } finally {
            setSending(false);
          }
        }}
      />
    </div>
  );
}

