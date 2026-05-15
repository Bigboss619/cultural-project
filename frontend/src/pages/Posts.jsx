import React, { useMemo, useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import {
  FeaturedPostsPanel,
  PostsFeatures,
  PostsList,
  PostsToolbar,
} from '../components/Post';
import { INITIAL_FEATURES, INITIAL_POSTS } from '../components/Post/mockPostsData';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [articles, setArticles] = useState(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | published | draft

  const navigate = useNavigate();



  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let next = articles;

    if (filter === 'published') next = next.filter((a) => a.status === 'published');
    if (filter === 'draft') next = next.filter((a) => a.status === 'draft');

    if (q) {
      next = next.filter((a) => {
        return (
          a.title.toLowerCase().includes(q) ||
          (a.summary || '').toLowerCase().includes(q) ||
          (a.category || '').toLowerCase().includes(q)
        );
      });
    }

    // newest first
    next = [...next].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return next;
  }, [articles, searchQuery, filter]);

  const featuredPosts = useMemo(() => {
    return articles
      .filter((a) => a.status === 'published' && a.featured)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [articles]);

  const openCreate = () => {
    setModalMode('create');
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEdit = (article) => {
    setModalMode('edit');
    setEditId(article.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const editorInitialData = useMemo(() => {
    if (modalMode === 'edit') {
      return articles.find((a) => a.id === editId);
    }
    return null;
  }, [articles, modalMode, editId]);

  const upsertArticle = (payload) => {
    const now = new Date().toISOString();

    if (modalMode === 'create') {
      const nextId = articles.length ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
      const next = {
        id: nextId,
        title: payload.title,
        category: payload.category,
        status: payload.status,
        featured: payload.featured,
        summary: payload.summary,
        content: payload.content,
        updatedAt: now,
      };

      setArticles((prev) => [next, ...prev]);
      closeModal();
      return;
    }

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id !== editId) return a;
        return {
          ...a,
          title: payload.title,
          category: payload.category,
          status: payload.status,
          // ensure featured can only be true when published
          featured: payload.status === 'published' ? payload.featured : false,
          summary: payload.summary,
          content: payload.content,
          updatedAt: now,
        };
      })
    );

    closeModal();
  };

  const deleteArticle = (article) => {
    const ok = window.confirm(`Delete article “${article.title}”?`);
    if (!ok) return;

    setArticles((prev) => prev.filter((a) => a.id !== article.id));

    if (modalMode === 'edit' && editId === article.id) closeModal();
  };

  const publishArticle = (article) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id !== article.id) return a;
        return {
          ...a,
          status: 'published',
          // keep featured only if it is currently true (editor disallows drafts -> featured)
          featured: a.featured,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Posts</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Main content management</p>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            New Article
          </button>
        </div>

        <PostsFeatures features={INITIAL_FEATURES} />

        <PostsToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onCreateClick={openCreate}
        />

        {/* Draft system */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'published', label: 'Published' },
            { key: 'draft', label: 'Drafts' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={
                filter === t.key
                  ? 'px-3 py-2 rounded-lg bg-blue-600 text-white text-sm'
                  : 'px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <PostsList
          posts={filteredArticles}
          filter={filter}
          onEdit={openEdit}
          onDelete={deleteArticle}
          onPublish={publishArticle}
        />

        <FeaturedPostsPanel posts={featuredPosts} onEdit={openEdit} />

        <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Featured posts management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Use Edit on a featured item to adjust its content, category, status, or featured flag.
          </p>
        </div>

        {/* Editor Modal */}
        {isModalOpen && (
          <PostEditorModal
            isOpen={isModalOpen}
            mode={modalMode}
            initialData={editorInitialData}
            onClose={closeModal}
            onSave={upsertArticle}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Posts;

