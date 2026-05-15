import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { INITIAL_FEATURES, INITIAL_POSTS } from '../components/Post/mockPostsData';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const normalize = (s) => (s == null ? '' : String(s));

// NOTE: This is a mock admin page. It persists to localStorage so the user
// can navigate back and see the newly created/edited article.
const storageKey = 'admin-mock-posts';

const loadArticles = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // ignore
  }
  return INITIAL_POSTS;
};

const saveArticles = (articles) => {
  localStorage.setItem(storageKey, JSON.stringify(articles));
};

const NewArticle = () => {
  const navigate = useNavigate();
  const params = useParams();

  const mode = params.mode; // create | edit (optional)
  const editId = params.id; // optional

  const [articles, setArticles] = useState(() => loadArticles());
  const editing = useMemo(() => {
    const idNum = editId ? Number(editId) : null;
    if (!idNum) return null;
    return articles.find((a) => a.id === idNum) || null;
  }, [articles, editId]);

  const categories = useMemo(
    () => ['History', 'Festivals', 'Traditional Attire', 'Food', 'Language', 'Dance', 'Music', 'Religion'],
    []
  );

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState('draft');
  const [featured, setFeatured] = useState(false);

  // Tiptap stores rich text as HTML
  const [summaryInitialHtml, setSummaryInitialHtml] = useState('<p></p>');
  const [contentInitialHtml, setContentInitialHtml] = useState('<p></p>');

  useEffect(() => {
    // initialize editor fields from editing
    const base = mode === 'edit' && editing ? editing : null;

    setTitle(normalize(base?.title));
    setCategory(normalize(base?.category) || categories[0]);
    setStatus(normalize(base?.status) || 'draft');
    setFeatured(Boolean(base?.featured));

    const sumHtml = base?.summary
      ? `<p>${String(base.summary).replaceAll('<', '<').replaceAll('>', '>')}</p>`
      : '<p></p>';

    // content in mock data may be plain text; convert to paragraph HTML.
    const contentHtml = base?.content
      ? `<p>${String(base.content).replaceAll('<', '<').replaceAll('>', '>')}</p>`
      : '<p></p>';

    setSummaryInitialHtml(sumHtml);
    setContentInitialHtml(contentHtml);
  }, [mode, editing, categories]);

  const extensions = useMemo(
    () => [StarterKit, Underline, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    []
  );

  const summaryEditor = useEditor({
    extensions,
    content: summaryInitialHtml,
    autofocus: false,
    editable: true,
  });

  const contentEditor = useEditor({
    extensions,
    content: contentInitialHtml,
    autofocus: false,
    editable: true,
  });


  useEffect(() => {
    if (!summaryEditor || !contentEditor) return;
    // when switching editId/mode, replace doc
    summaryEditor.commands.setContent(summaryInitialHtml);
    contentEditor.commands.setContent(contentInitialHtml);
  }, [summaryEditor, contentEditor, summaryInitialHtml, contentInitialHtml]);

  const onCancel = () => {
    navigate('/admin/posts');
  };

  const onSave = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const now = new Date().toISOString();

    const summaryHtml = summaryEditor ? summaryEditor.getHTML() : summaryInitialHtml;
    const contentHtml = contentEditor ? contentEditor.getHTML() : contentInitialHtml;

    // Convert HTML to plain text-ish summary for easier mock filtering.
    // For now we keep HTML in summary/content fields (as strings) to simulate Tiptap.

    if (mode === 'edit' && editing) {
      setArticles((prev) => {
        const next = prev.map((a) => {
          if (a.id !== editing.id) return a;
          return {
            ...a,
            title: cleanTitle,
            category,
            status,
            featured: status === 'published' ? featured : false,
            summary: summaryHtml,
            content: contentHtml,
            updatedAt: now,
          };
        });
        saveArticles(next);
        return next;
      });
    } else {
      setArticles((prev) => {
        const nextId = prev.length ? Math.max(...prev.map((a) => a.id)) + 1 : 1;
        const next = [
          {
            id: nextId,
            title: cleanTitle,
            category,
            status,
            featured: status === 'published' ? featured : false,
            summary: summaryHtml,
            content: contentHtml,
            updatedAt: now,
          },
          ...prev,
        ];
        saveArticles(next);
        return next;
      });
    }

    navigate('/admin/posts');
  };

  if (!summaryEditor || !contentEditor) {
    // simple fallback while Tiptap initializes
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="text-2xl font-bold">Loading editor...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{mode === 'edit' ? 'Edit article' : 'New article'}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Draft, publish, and feature (mock).</p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  disabled={status !== 'published'}
                  className="accent-blue-600"
                />
                <div>
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Enabled only for published.</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Summary</div>
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <EditorContent editor={summaryEditor} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Content</div>
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <EditorContent editor={contentEditor} />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewArticle;

