import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { RefreshCw, Trash2, Mail, MailOpen, Search, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/toast';

const AdminMessages = () => {
  const { showError, showSuccess } = useToast();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchMessages = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setMessages(resp.data?.messages || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load messages';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Fetch replies when a message is selected
  const fetchReplies = useCallback(async (messageId) => {
    try {
      const resp = await axios.get(`/api/messages/${messageId}/replies`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setReplies(resp.data?.replies || []);
    } catch (err) {
      console.warn('Failed to fetch replies', err);
      setReplies([]);
    }
  }, [authToken]);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyText('');
    if (!msg.is_read) {
      handleMarkRead(msg.id);
    }
    fetchReplies(msg.id);
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(`/api/messages/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: 1 } : m));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => prev ? { ...prev, is_read: 1 } : null);
      }
    } catch (err) {
      showError('Failed to mark message as read');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/messages/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => prev ? { ...prev, status: newStatus } : null);
      }
      showSuccess('Status updated');
    } catch (err) {
      showError('Failed to update status');
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    try {
      setSendingReply(true);
      const resp = await axios.post(`/api/messages/${selectedMessage.id}/reply`, {
        reply_text: replyText.trim(),
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      showSuccess('Reply sent successfully');
      setReplyText('');
      fetchReplies(selectedMessage.id);
    } catch (err) {
      showError('Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setDeletingId(id);
      await axios.delete(`/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
        setReplies([]);
      }
      showSuccess('Message deleted successfully');
    } catch (err) {
      showError('Failed to delete message');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.is_read;
    if (filter === 'read') return msg.is_read;
    if (filter === 'open') return msg.status === 'open';
    if (filter === 'closed') return msg.status === 'closed';
    return true;
  }).filter(msg => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      msg.full_name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q)
    );
  });

  const unreadCount = messages.filter(m => !m.is_read).length;
  const openCount = messages.filter(m => m.status === 'open').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage contact form submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-sm text-gray-500">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Mail size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-500">Unread</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Mail size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{openCount}</p>
                <p className="text-sm text-gray-500">Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-slate-700">
            {/* Messages List */}
            <div className="max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-600">
                  <p className="mb-3">{error}</p>
                  <button
                    onClick={fetchMessages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No messages found
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                      selectedMessage?.id === msg.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } ${!msg.is_read ? 'font-semibold' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full flex-shrink-0 ${msg.is_read ? 'bg-gray-100 dark:bg-slate-700' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                        {msg.is_read ? (
                          <MailOpen size={18} className="text-gray-400" />
                        ) : (
                          <Mail size={18} className="text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {msg.full_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                          {msg.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Details + Replies */}
            <div className="max-h-[600px] overflow-y-auto">
              {selectedMessage ? (
                <div className="p-4 space-y-4">
                  {/* Message header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-white">Message</h3>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value)}
                      className="px-2 py-1 rounded border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  {/* Original message */}
                  <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{selectedMessage.full_name}</span>
                      <span className="text-xs text-gray-500">{selectedMessage.email}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{selectedMessage.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{selectedMessage.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(selectedMessage.created_at)}</p>
                  </div>

                  {/* Replies section */}
                  {replies.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <MessageSquare size={16} />
                        <span>Replies ({replies.length})</span>
                      </div>
                      {replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`p-3 rounded-lg ${
                            reply.replied_by === 'admin'
                              ? 'bg-blue-50 dark:bg-blue-900/20 ml-4'
                              : 'bg-gray-50 dark:bg-slate-900 mr-4'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-medium ${
                              reply.replied_by === 'admin'
                                ? 'text-blue-600'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {reply.replied_by === 'admin' ? 'You (Admin)' : selectedMessage.full_name}
                            </span>
                            <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reply.reply_text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply input */}
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        Reply will be saved in database
                      </span>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim() || sendingReply}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm disabled:opacity-50 transition-colors"
                      >
                        {sendingReply ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Reply
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    disabled={deletingId === selectedMessage.id}
                    className="w-full mt-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete Message
                  </button>
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center h-full text-gray-500">
                  <Mail size={48} className="mb-4 opacity-20" />
                  <p>Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;