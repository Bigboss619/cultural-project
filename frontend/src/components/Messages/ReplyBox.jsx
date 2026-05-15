import React, { useMemo, useState } from 'react';

export default function ReplyBox({
  onReply,
  disabled,
}) {
  const [draft, setDraft] = useState('');

  const canSend = useMemo(() => draft.trim().length >= 1, [draft]);

  return (
    <div className="mt-4 border border-gray-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900">
      <h3 className="font-bold text-gray-900 dark:text-slate-50">Reply</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        Write a response to the sender.
      </p>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={5}
        className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your reply..."
        disabled={disabled}
      />

      <div className="flex items-center justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={() => setDraft('')}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
          disabled={disabled || !draft}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            onReply(draft);
            setDraft('');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={disabled || !canSend}
        >
          Send reply
        </button>
      </div>
    </div>
  );
}

