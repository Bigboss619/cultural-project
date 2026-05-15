import React, { useMemo, useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import {
  MESSAGES_MOCK_THREADS,
  MESSAGES_TABS,
} from '../components/Messages/messagesMockData';
import MessagesTabs from '../components/Messages/MessagesTabs';
import MessagesToolbar from '../components/Messages/MessagesToolbar';
import MessagesList from '../components/Messages/MessagesList';
import MessageDetails from '../components/Messages/MessageDetails';

const AdminMessages = () => {
  const [activeTab, setActiveTab] = useState(MESSAGES_TABS.MESSAGES);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const [threads, setThreads] = useState(MESSAGES_MOCK_THREADS);
  const [selectedId, setSelectedId] = useState(() => {
    const first = MESSAGES_MOCK_THREADS.find((t) => t.tab === MESSAGES_TABS.MESSAGES);
    return first?.id || null;
  });

  const visibleThreads = useMemo(() => {
    const q = query.trim().toLowerCase();

    return threads
      .filter((t) => t.tab === activeTab)
      .filter((t) => {
        if (filter === 'unread') return t.unread;
        if (filter === 'read') return !t.unread;
        if (filter === 'open') return t.status === 'open';
        if (filter === 'resolved') return t.status === 'resolved';
        return true;
      })
      .filter((t) => {
        if (!q) return true;
        return (
          t.fromName.toLowerCase().includes(q) ||
          t.fromEmail.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [threads, activeTab, query, filter]);

  const selectedThread = useMemo(() => {
    return threads.find((t) => t.id === selectedId && t.tab === activeTab) || null;
  }, [threads, selectedId, activeTab]);

  const ensureSelectionForTab = () => {
    const alreadySelected = visibleThreads.some((t) => t.id === selectedId);
    if (alreadySelected) return;
    const first = visibleThreads[0];
    setSelectedId(first ? first.id : null);
  };

  const onChangeTab = (tab) => {
    setActiveTab(tab);
    // selection will be corrected after visibleThreads recompute
    setTimeout(ensureSelectionForTab, 0);
  };

  const handleMarkRead = (id) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  const handleReply = async (threadId, draft) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        return {
          ...t,
          unread: false,
          replies: [
            ...t.replies,
            {
              id: `${threadId}-r-${Date.now()}`,
              from: 'admin@cultural-project.local',
              role: 'admin',
              body: draft,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      })
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user messages and contact form submissions
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold text-gray-700 dark:text-slate-200">Main content management section</div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Messages / Contact
                </div>
              </div>

              <MessagesTabs activeTab={activeTab} onChange={onChangeTab} />
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-5">
              <div className="text-sm font-bold text-gray-700 dark:text-slate-200">Features</div>
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                View messages, Reply, and Mark as read
              </div>
            </div>

            <MessagesToolbar
              query={query}
              onQueryChange={setQuery}
              filter={filter}
              onFilterChange={setFilter}
            />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5">
                <MessagesList
                  threads={visibleThreads}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onMarkRead={handleMarkRead}
                />
              </div>

              <div className="lg:col-span-7">
                <MessageDetails
                  thread={selectedThread}
                  onMarkRead={handleMarkRead}
                  onReply={handleReply}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;

