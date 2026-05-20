import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { RefreshCw, Trash2, Check, X, MessageSquare, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/toast';

const AdminComments = () => {
  const { showError, showSuccess } = useToast();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [moderatingId, setModeratingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchComments = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await axios.get('/api/comments', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setComments(resp.data?.comments || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load comments';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleApprove = async (id, approved) => {
    try {
      setModeratingId(id);
      await axios.patch(`/api/comments/${id}/approve`, { approved }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setComments(prev => prev.map(c => c.id === id ? { ...c, approved } : c));
      showSuccess(approved ? 'Comment approved' : 'Comment rejected');
    } catch (err) {
      showError('Failed to moderate comment');
    } finally {
      setModeratingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      setDeletingId(id);
      await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setComments(prev => prev.filter(c => c.id !== id));
      showSuccess('Comment deleted successfully');
    } catch (err) {
      showError('Failed to delete comment');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredComments = comments.filter(comment => {
    if (filter === 'pending') return !comment.approved;
    if (filter === 'approved') return comment.approved;
    return true;
  }).filter(comment => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      comment.author_name?.toLowerCase().includes(q) ||
      comment.author_email?.toLowerCase().includes(q) ||
      comment.content?.toLowerCase().includes(q) ||
      comment.post_title?.toLowerCase().includes(q)
    );
  });

  const pendingCount = comments.filter(c => !c.approved).length;
  const approvedCount = comments.filter(c => c.approved).length;

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
            <h1 className="text-3xl font-bold">Comments</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Moderate user comments on blog posts
            </p>
          </div>
          <button
            onClick={fetchComments}
            className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{comments.length}</p>
                <p className="text-sm text-gray-500">Total Comments</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <X size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-gray-500">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="text-sm text-gray-500">Approved</p>
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
                placeholder="Search by name, email, content or post..."
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
              <option value="all">All Comments</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          {/* Comments Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">
                <p className="mb-3">{error}</p>
                <button
                  onClick={fetchComments}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : filteredComments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No comments found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredComments.map((comment) => (
                    <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#B85C3C] flex items-center justify-center text-white font-bold flex-shrink-0">
                            {comment.author_name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {comment.author_name}
                            </p>
                            <p className="text-xs text-gray-500">{comment.author_email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={`/blog/${comment.post_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 line-clamp-2"
                        >
                          {comment.post_title || 'Unknown Post'}
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            comment.approved
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                        >
                          {comment.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(comment.created_at)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {!comment.approved && (
                            <button
                              onClick={() => handleApprove(comment.id, true)}
                              disabled={moderatingId === comment.id}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          {comment.approved && (
                            <button
                              onClick={() => handleApprove(comment.id, false)}
                              disabled={moderatingId === comment.id}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(comment.id)}
                            disabled={deletingId === comment.id}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminComments;