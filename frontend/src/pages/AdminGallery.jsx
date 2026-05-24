import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, RefreshCw, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import api from '../config/axios';
import { useToast } from '../components/toast';

const GalleryForm = ({ item, categories, onSuccess, onCancel }) => {
  const { showError, showSuccess } = useToast();
  const authToken = localStorage.getItem('authToken');
  const isEditing = !!item?.id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    caption: '',
    status: 'draft',
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        category: item.category || '',
        caption: item.caption || '',
        status: item.status || 'draft',
        display_order: item.display_order || 0,
      });
      setPreviewUrl(item.image_url || '');
    }
  }, [item]);

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

    if (!formData.title.trim()) {
      showError('Title is required');
      return;
    }
    if (!formData.category) {
      showError('Category is required');
      return;
    }
    if (!isEditing && !imageFile) {
      showError('Image is required');
      return;
    }

    try {
      setSubmitting(true);

      const formPayload = new FormData();
      formPayload.append('title', formData.title.trim());
      formPayload.append('category', formData.category);
      formPayload.append('caption', formData.caption.trim() || '');
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
        await api.put(`/api/gallery/${item.id}`, formPayload, { headers });
        showSuccess('Gallery item updated successfully');
      } else {
        await api.post('/api/gallery', formPayload, { headers });
        showSuccess('Gallery item created successfully');
      }

      onSuccess();
    } catch (err) {
      showError(err?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} gallery item`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
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
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Heritage Festival 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Optional caption or description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image {isEditing ? '(leave empty to keep existing)' : '*'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-lg object-cover border border-gray-200" />
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

const AdminGallery = () => {
  const { showError, showSuccess } = useToast();

  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchGalleryItems = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await api.get('/api/gallery', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setGalleryItems(resp.data?.gallery || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load gallery items';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  const fetchCategories = useCallback(async () => {
    try {
      const resp = await api.get('/api/public/categories');
      setCategories(resp.data?.categories || []);
    } catch (err) {
      console.warn('Failed to fetch categories', err);
    }
  }, [authToken, showError]);

  // const fetchCategories = useCallback(async () => {
  //   try {
  //     const resp = await api.get('/api/public/categories');
  //     setCategories(resp.data?.categories || []);
  //   } catch (err) {
  //     console.warn('Failed to fetch categories', err);
  //   }
  // }, []);

  useEffect(() => {
    fetchGalleryItems();
    fetchCategories();
  }, [fetchGalleryItems, fetchCategories]);

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      setDeletingId(itemId);
      await api.delete(`/api/gallery/${itemId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setGalleryItems(prev => prev.filter(item => item.id !== itemId));
      showSuccess('Gallery item deleted successfully');
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to delete gallery item');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingItem(null);
    fetchGalleryItems();
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingItem(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage gallery images</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchGalleryItems}
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
              Add Image
            </button>
          </div>
        </div>

        {/* Create/Edit form */}
        {showCreateForm ? (
          <GalleryForm
            item={editingItem}
            categories={categories}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : null}

        {/* Gallery grid */}
        <div>
          <h2 className="text-xl font-bold mb-4">Gallery Images</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center">
              <p className="mb-3">{error}</p>
              <button
                onClick={fetchGalleryItems}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 text-center">
              No gallery items found. Add your first image above.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map(item => (
                <div key={item.id} className="group relative rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gradient-to-br from-[#B85C3C] to-[#8B4423] flex items-center justify-center">
                      <ImageIcon className="text-white/30" size={48} />
                    </div>
                  )}

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Info overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {item.category}
                    </span>
                    <p className="text-white font-medium text-sm mt-1 truncate">{item.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                      item.status === 'published'
                        ? 'bg-green-500/80 text-white'
                        : 'bg-yellow-500/80 text-white'
                    }`}>
                      {item.status}
                    </span>
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

export default AdminGallery;