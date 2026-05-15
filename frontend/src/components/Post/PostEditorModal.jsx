import React, { useEffect, useMemo, useState } from 'react';


const normalize = (s) => (s == null ? '' : String(s));

const PostEditorModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}) => {
  const categories = useMemo(
    () => ['History', 'Festivals', 'Traditional Attire', 'Food', 'Language', 'Dance', 'Music', 'Religion'],
    []
  );

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState('draft');
  const [featured, setFeatured] = useState(false);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setTitle(normalize(initialData?.title));
    setCategory(normalize(initialData?.category) || categories[0]);
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
      category,
      status,
      featured: status === 'published' ? featured : false, // drafts cannot be featured
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
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


