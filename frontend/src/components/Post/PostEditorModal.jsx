import React, { useEffect, useMemo, useState } from 'react';


const normalize = (s) => (s == null ? '' : String(s));

const PostEditorModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}) => {
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState('');

  const [title, setTitle] = useState('');

  const [categoryId, setCategoryId] = useState(null);

  const [status, setStatus] = useState('draft');
  const [featured, setFeatured] = useState(false);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      if (!isOpen) return;
      if (!authToken) {
        setCategoriesError('Not authenticated');
        return;
      }

      try {
        setLoadingCategories(true);
        setCategoriesError('');

        const resp = await fetch('/api/categories', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!resp.ok) {
          const data = await resp.json().catch(() => null);
          throw new Error(data?.message || 'Failed to fetch categories');
        }

        const data = await resp.json();
        if (!isMounted) return;
        setCategories(data?.categories || []);
      } catch (e) {
        if (!isMounted) return;
        setCategoriesError(e?.message || 'Failed to fetch categories');
      } finally {
        if (!isMounted) return;
        setLoadingCategories(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, [isOpen, authToken]);

  useEffect(() => {
    if (!isOpen) return;

    setTitle(normalize(initialData?.title));

    // editor uses category_id (number) but we also tolerate older shapes
    const nextCategoryId =
      initialData?.category_id ?? initialData?.categoryId ?? initialData?.category;

    if (categories?.length) {
      const asString = String(nextCategoryId ?? '');
      const found = categories.find((c) => String(c.id) === asString);
      setCategoryId(found ? found.id : categories[0].id);
    } else {
      // will be set after categories arrive
      setCategoryId(nextCategoryId ?? null);
    }

    setStatus(normalize(initialData?.status) || 'draft');
    setFeatured(Boolean(initialData?.featured));
    setSummary(normalize(initialData?.summary));
    setContent(normalize(initialData?.content));
  }, [isOpen, initialData, categories]);


  const titleId = 'post-editor-title';

  const submit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    onSave({
      title: cleanTitle,
      category_id: categoryId,
      status,
      // featured_image is what the backend table stores; UI checkbox kept for now
      featured_image: status === 'published' ? (featured ? 'featured' : null) : null,
      featured,
      summary: summary.trim() || '—',
      content: content.trim() || '—',
    });

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-lg font-bold">{mode === 'edit' ? 'Edit article' : 'Create article'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mock CRUD (local state only).</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor={titleId} className="text-sm font-medium">
                Title
              </label>
              <input
                id={titleId}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. History of Igbo Culture"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={categoryId ?? ''}
                onChange={(e) => setCategoryId(Number(e.target.value))}

                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}

              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1">
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2">
              <input
                id="featured-checkbox"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                disabled={status !== 'published'}
                className="accent-blue-600"
              />
              <label htmlFor="featured-checkbox" className="text-sm font-medium">
                Featured (enabled only for published)
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[92px]"
              placeholder="Short summary..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[160px]"
              placeholder="Write your article content..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {mode === 'edit' ? 'Save changes' : 'Create article'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditorModal;


