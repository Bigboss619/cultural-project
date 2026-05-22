import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, RefreshCw, Edit2, Trash2, X } from 'lucide-react';
import api from '../config/axios';
import { useToast } from '../components/toast';

const TestimonialForm = ({ testimonial, onSuccess, onCancel }) => {
  const { showError, showSuccess } = useToast();
  const authToken = localStorage.getItem('authToken');
  const isEditing = !!testimonial?.id;

  const [formData, setFormData] = useState({
    quote: '',
    name: '',
    title: '',
    status: 'draft',
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote || '',
        name: testimonial.name || '',
        title: testimonial.title || '',
        status: testimonial.status || 'draft',
        display_order: testimonial.display_order || 0,
      });
      setPreviewUrl(testimonial.image_url || '');
    }
  }, [testimonial]);

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

    if (!formData.quote.trim()) {
      showError('Quote is required');
      return;
    }
    if (!formData.name.trim()) {
      showError('Name is required');
      return;
    }

    try {
      setSubmitting(true);

      const formPayload = new FormData();
      formPayload.append('quote', formData.quote.trim());
      formPayload.append('name', formData.name.trim());
      formPayload.append('title', formData.title.trim());
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
        await axios.put(`/api/testimonials/${testimonial.id}`, formPayload, { headers });
        showSuccess('Testimonial updated successfully');
      } else {
        await api.post('/testimonials', formPayload, { headers });
        showSuccess('Testimonial created successfully');
      }

      onSuccess();
    } catch (err) {
      showError(err?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} testimonial`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Quote *</label>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter testimonial quote..."
            required
          />
        </div>

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
            <label className="block text-sm font-medium mb-1">Title / Role</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Member, Community Partner"
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

const AdminTestimonial = () => {
  const { showError, showSuccess } = useToast();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchTestimonials = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await api.get('/testimonials', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setTestimonials(resp.data?.testimonials || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load testimonials';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleDelete = async (testimonialId) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      setDeletingId(testimonialId);
      await axios.delete(`/api/testimonials/${testimonialId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
      showSuccess('Testimonial deleted successfully');
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to delete testimonial');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingTestimonial(null);
    fetchTestimonials();
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingTestimonial(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Testimonials</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage member testimonials</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchTestimonials}
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
              Add testimonial
            </button>
          </div>
        </div>

        {/* Create/Edit form */}
        {showCreateForm ? (
          <TestimonialForm
            testimonial={editingTestimonial}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : null}

        {/* Testimonials list */}
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Testimonials</h2>
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center">
              <p className="mb-3">{error}</p>
              <button
                onClick={fetchTestimonials}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 text-center">
              No testimonials found. Create your first testimonial above.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {testimonial.image_url ? (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B85C3C] to-[#1A1A1A] flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-2">
                        <p className="font-semibold text-[#B85C3C]">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          testimonial.status === 'published'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {testimonial.status}
                        </span>
                        {testimonial.display_order > 0 && (
                          <span className="text-xs text-gray-400">
                            Order: {testimonial.display_order}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deletingId === testimonial.id}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      {deletingId === testimonial.id ? 'Deleting...' : 'Delete'}
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

export default AdminTestimonial;