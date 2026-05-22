import React, { useEffect, useMemo, useState } from 'react';
import api from '../config/axios';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

const initialFeatures = [
  {
    id: 1,
    title: 'Curated taxonomy',
    description: 'Organize content with clear, meaningful categories.',
  },
  {
    id: 2,
    title: 'Fast navigation',
    description: 'Find topics quickly across posts and resources.',
  },
  {
    id: 3,
    title: 'Admin tools',
    description: 'Add, edit, or remove categories.',
  },
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const [editId, setEditId] = useState(null);

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;

    return categories.filter((c) => {
      return (
        (c.name || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q)
      );
    });
  }, [categories, searchQuery]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError('');

        if (!authToken) {
          setError('Not authenticated. Please log in again.');
          setLoading(false);
          return;
        }

        const resp = await api.get('/categories', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const list = resp?.data?.categories || [];
        if (isMounted) setCategories(list);
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || 'Failed to load categories');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [authToken]);

  const openAdd = () => {
    setFormName('');
    setFormDescription('');
    setEditId(null);
    setIsAddOpen(true);
  };

  const openEdit = (cat) => {
    setFormName(cat.name || '');
    setFormDescription(cat.description || '');
    setEditId(cat.id);
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setEditId(null);
  };

  const refreshCategories = async () => {
    const resp = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setCategories(resp?.data?.categories || []);
  };

  const upsertCategory = async () => {
    const name = formName.trim();
    const description = formDescription.trim();

    if (!name) return;
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editId == null) {
        await api.post(
          '/categories',
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else {
        await api.put(
          `/categories/${editId}`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      await refreshCategories();
      closeModal();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (cat) => {
    const ok = window.confirm(`Delete category “${cat.name}”?`);
    if (!ok) return;

    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await api.delete(`/categories/${cat.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      await refreshCategories();

      if (isEditOpen && editId === cat.id) closeModal();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage content categories</p>
          </div>
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Feedback */}
        {loading && (
          <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-sm">
            Loading categories...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 dark:border-red-900/50 p-4 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20">
            {error}
          </div>
        )}

        {/* Features */}
        <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {initialFeatures.map((f) => (
              <div
                key={f.id}
                className="p-3 rounded-lg bg-gray-50/70 dark:bg-slate-900/30 border border-gray-200/60 dark:border-slate-700"
              >
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label={`Edit ${cat.name}`}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label={`Delete ${cat.name}`}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">{cat.posts ?? 0} posts</p>
            </div>
          ))}
        </div>

        {!loading && !error && filteredCategories.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 py-10">No categories found.</div>
        )}

        {/* Add/Edit Modal */}
        {(isAddOpen || isEditOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-lg font-bold">{isEditOpen ? 'Edit category' : 'Add category'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Editable and deletable via backend</div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Festivals"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[92px]"
                    placeholder="Short description..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={upsertCategory}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-60"
                  >
                    {isEditOpen ? 'Save changes' : 'Add category'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Categories;

