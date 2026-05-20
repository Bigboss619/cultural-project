import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, RefreshCw, Edit2, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/toast';

const ExecutiveForm = ({ executive, onSuccess, onCancel }) => {
  const { showError, showSuccess } = useToast();
  const authToken = localStorage.getItem('authToken');
  const isEditing = !!executive?.id;

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    status: 'draft',
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (executive) {
      setFormData({
        name: executive.name || '',
        position: executive.position || '',
        bio: executive.bio || '',
        status: executive.status || 'draft',
        display_order: executive.display_order || 0,
      });
      setPreviewUrl(executive.image_url || '');
    }
  }, [executive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showError('Name is required');
      return;
    }
    if (!formData.position.trim()) {
      showError('Position is required');
      return;
    }

    try {
      setSubmitting(true);

      const formPayload = new FormData();
      formPayload.append('name', formData.name.trim());
      formPayload.append('position', formData.position.trim());
      formPayload.append('bio', formData.bio.trim() || '');
      formPayload.append('status', formData.status);
      formPayload.append('display_order', Number(formData.display_order) || 0);
      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      };

      if (isEditing) {
        await axios.put(`/api/executives/${executive.id}`, formPayload, { headers });
        showSuccess('Executive updated successfully');
      } else {
        await axios.post('/api/executives', formPayload, { headers });
        showSuccess('Executive created successfully');
      }

      onSuccess();
    } catch (err) {
      showError(err?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} executive`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{isEditing ? 'Edit Executive' : 'Add New Executive'}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., President, Vice President"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Short biography..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminExecutive = () => {
  const { showError, showSuccess } = useToast();

  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchExecutives = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await axios.get('/api/executives', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setExecutives(resp.data?.executives || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load executives';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  useEffect(() => {
    fetchExecutives();
  }, [fetchExecutives]);

  const handleDelete = async (executiveId) => {
    if (!window.confirm('Are you sure you want to delete this executive?')) return;

    try {
      setDeletingId(executiveId);
      await axios.delete(`/api/executives/${executiveId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setExecutives(prev => prev.filter(e => e.id !== executiveId));
      showSuccess('Executive deleted successfully');
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to delete executive');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (executive) => {
    setEditingExecutive(executive);
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingExecutive(null);
    fetchExecutives();
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingExecutive(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Executives</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage organization executives</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchExecutives}
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add executive
            </button>
          </div>
        </div>

        {/* Create/Edit form */}
        {showCreateForm ? (
          <ExecutiveForm
            executive={editingExecutive}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : null}

        {/* Executives list */}
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Executives</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center">
              <p className="mb-3">{error}</p>
              <button
                onClick={fetchExecutives}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : executives.length === 0 ? (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 text-center">
              No executives found. Create your first executive above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {executives.map(executive => (
                <div key={executive.id} className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {executive.image_url ? (
                        <img
                          src={executive.image_url}
                          alt={executive.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#B85C3C] to-[#1A1A1A] flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {executive.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          executive.status === 'published'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {executive.status}
                        </span>
                        {executive.display_order > 0 && (
                          <span className="text-xs text-gray-400">
                            #{executive.display_order}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{executive.position}</p>
                      <h3 className="font-semibold text-[#1A1A1A] truncate">{executive.name}</h3>
                    </div>
                  </div>

                  {executive.bio && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {executive.bio}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(executive)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(executive.id)}
                      disabled={deletingId === executive.id}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      {deletingId === executive.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminExecutive;