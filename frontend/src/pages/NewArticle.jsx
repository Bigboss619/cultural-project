// NewArticle.jsx - SIMPLIFIED VERSION
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import RichTextEditor from '../components/Post/RichTextEditor'; // ✅ New component
import { INITIAL_FEATURES, INITIAL_POSTS } from '../components/Post/mockPostsData';

const normalize = (s) => (s == null ? '' : String(s));

const storageKey = 'admin-mock-posts';

const loadArticles = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : INITIAL_POSTS;
  } catch {
    return INITIAL_POSTS;
  }
};

const saveArticles = (articles) => {
  localStorage.setItem(storageKey, JSON.stringify(articles));
};

const NewArticle = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();

  const [articles, setArticles] = useState(loadArticles());
  const editing = id ? articles.find(a => a.id === Number(id)) : null;

  const categories = ['History', 'Festivals', 'Traditional Attire', 'Food', 'Language', 'Dance', 'Music', 'Religion'];

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState('draft');
  const [featured, setFeatured] = useState(false);
  const [summary, setSummary] = useState('<p></p>');
  const [content, setContent] = useState('<p></p>');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '');
      setCategory(editing.category || categories[0]);
      setStatus(editing.status || 'draft');
      setFeatured(editing.featured || false);
      setSummary(editing.summary || '<p></p>');
      setContent(editing.content || '<p></p>');
    }
  }, [editing, categories]);

  const handleSave = () => {
    if (!title.trim()) return;

    const now = new Date().toISOString();
    const newArticle = {
      id: editing?.id || Date.now(),
      title: title.trim(),
      category,
      status,
      featured: status === 'published' ? featured : false,
      summary,
      content,
      updatedAt: now,
    };

    setArticles(prev => {
      let next;
      if (editing) {
        next = prev.map(a => a.id === editing.id ? newArticle : a);
      } else {
        next = [newArticle, ...prev];
      }
      saveArticles(next);
      return next;
    });

    navigate('/admin/posts');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
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
                content={summary}
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