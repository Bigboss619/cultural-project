// NewArticle.jsx - Backend-connected version
import React, { useEffect, useMemo, useState } from 'react';
import api from '../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import RichTextEditor from '../components/Post/RichTextEditor';
import { useToast } from '../components/toast';

const normalize = (s) => (s == null ? '' : String(s));


const NewArticle = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { showError } = useToast();


  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const isEdit = mode === 'edit' && Boolean(id);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState('');

  // Form state (API shape)
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [status, setStatus] = useState('draft');
  const [featured, setFeatured] = useState(false);
  const [summary, setSummary] = useState('<p></p>');
  const [content, setContent] = useState('<p></p>');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // TipTap editors re-render only when `content` prop changes.
  // Keep stable HTML strings so Edit mode correctly shows summary/content.
  const summaryHtml = useMemo(() => normalize(summary), [summary]);
  const contentHtml = useMemo(() => normalize(content), [content]);


  const fetchCategories = async () => {
    if (!authToken) {
      setCategoriesError('Not authenticated. Please log in again.');
      showError('Not authenticated. Please log in again.');
      return;
    }

    try {

      setCategoriesLoading(true);
      setCategoriesError('');

      const resp = await api.get('/categories', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setCategories(resp?.data?.categories || []);
    } catch (err) {
      setCategoriesError(err?.response?.data?.message || 'Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchPost = async (postId) => {
    if (!authToken) {
      setFormError('Not authenticated. Please log in again.');
      return;
    }

    try {
      setFormError('');

      const resp = await api.get(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const p = resp?.data?.post;
      if (!p) return;

      setTitle(normalize(p.title));
      setCategoryId(p.category_id ?? null);
      setStatus(normalize(p.status) || 'draft');
      setFeatured(Boolean(p.featured));

      // backend returns derived summary for compatibility (first 160 chars)
      setSummary(normalize(p.summary));
      setContent(normalize(p.content));
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Failed to load post');
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  useEffect(() => {
    if (!isEdit) return;
    fetchPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id, authToken]);

  // Default category once categories arrive (create mode only)
  useEffect(() => {
    if (!categories?.length) return;
    if (isEdit) return; // keep fetched categoryId
    if (categoryId == null) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId, isEdit]);

  const handleSave = async () => {
    if (!authToken) {
      setFormError('Not authenticated. Please log in again.');
      return;
    }

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setFormError('Title is required');
      setFormSuccess('');
      return;
    }

    if (!categoryId) {
      setFormError('Category is required');
      setFormSuccess('');
      return;
    }


    setSaving(true);
    setFormError('');

    const finalCategoryId = Number(categoryId);

    const safeSummary = normalize(summary).trim();
    const safeContent = normalize(content).trim();

    // guard: RichTextEditor sometimes keeps placeholders like <p></p>
    // Treat them as empty for validation.
  const isEmptyHtml = (s) => {
      const t = String(s || '')
        .replace(/\s+/g, '')
        .toLowerCase();

      // editor can output variations when user deletes everything
      return (
        t === '' ||
        t === '<p></p>' ||
        t === '<p/>' ||
        t === '<br/>' ||
        t === '<p><br></p>' ||
        t === '<p><br/></p>' ||
        t === '<div></div>' ||
        t === '<div><br></div>'
      );
    };


    const summaryIsEmpty = isEmptyHtml(safeSummary);
    const contentIsEmpty = isEmptyHtml(safeContent);


    // enforce the same rules backend validates, so user sees messages reliably
    if (summaryIsEmpty) {
      showError('summary is required');
      setFormError('summary is required');
      return;
    }

    if (contentIsEmpty) {
      showError('content is required');
      setFormError('content is required');
      return;
    }




    const payload = {

      title: cleanTitle,
      category_id: Number.isFinite(finalCategoryId) ? finalCategoryId : categoryId,
      status,
      // allow saving draft even if featured is checked
      featured: status === 'published' ? Boolean(featured) : false,
      featured_image: null,
      summary: normalize(summary).trim(),
      content: normalize(content).trim(),

    };



    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, payload, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } else {
        await api.post('/posts', payload, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      }

      setFormSuccess(isEdit ? 'Post updated successfully' : 'Post created successfully');
      navigate('/admin/posts');
    } catch (err) {

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0]?.message ||
        err?.message ||
        'Failed to save post';

      showError(msg);

      // prevent stale success banner
      setFormSuccess('');
      setFormError(msg);

      console.error('Save post failed:', err?.response?.data || err);
    } finally {

      setSaving(false);
    }
  };


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Toasts are handled globally */}
        {formError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
            {formError}
          </div>
        )}
        {formSuccess && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
            {formSuccess}
          </div>
        )}


        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {mode === 'edit' ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create or edit your article content
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Form Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4">Article Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={categoryId ?? ''}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    {categoriesLoading ? (
                      <option value="" disabled>Loading...</option>
                    ) : (
                      categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))
                    )}
                  </select>

                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    disabled={status !== 'published'}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium">
                    <div>Featured Article</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Only available for published articles
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/admin/posts')}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                  disabled={!title.trim()}
                >
                  {mode === 'edit' ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Editors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Editor */}
            <div>
              <label className="block text-sm font-semibold mb-3">Article Summary</label>
              <RichTextEditor
                content={summaryHtml}
                onUpdate={setSummary}

                placeholder="Write a brief summary of your article..."
                height="250px"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-semibold mb-3">Article Content</label>
              <RichTextEditor
                content={content}
                onUpdate={setContent}
                placeholder="Start writing your article content here..."
                height="500px"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewArticle;