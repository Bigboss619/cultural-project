import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { FeaturedPostsPanel, PostsFeatures, PostsList, PostsToolbar } from '../components/Post';

import { INITIAL_FEATURES } from '../components/Post/mockPostsData';

const Posts = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | published | draft

  const navigate = useNavigate();

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState('');

  const fetchPosts = async () => {
    if (!authToken) {
      setPostsError('Not authenticated. Please log in again.');
      return;
    }

    setLoadingPosts(true);
    setPostsError('');

    try {
      const resp = await axios.get('/api/posts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setArticles(resp?.data?.posts || []);
    } catch (err) {
      setPostsError(err?.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

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

    next = [...next].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return next;
  }, [articles, searchQuery, filter]);

  const featuredPosts = useMemo(() => {
    return articles
      .filter((a) => a.status === 'published' && a.featured)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [articles]);

  const openCreate = () => {
    navigate('/admin/posts/new');
  };

  const openEdit = (article) => {
    navigate(`/admin/posts/edit/${article.id}`);
  };

  const deleteArticle = async (article) => {
    if (!authToken) {
      setPostsError('Not authenticated. Please log in again.');
      return;
    }

    const ok = window.confirm(`Delete article “${article.title}”?`);
    if (!ok) return;

    try {
      await axios.delete(`/api/posts/${article.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      await fetchPosts();
    } catch (err) {
      setPostsError(err?.response?.data?.message || 'Failed to delete post');
    }
  };

  const publishArticle = async (article) => {
    if (!authToken) {
      setPostsError('Not authenticated. Please log in again.');
      return;
    }

    try {
      setPostsError('');

      await axios.put(
        `/api/posts/${article.id}`,
        {
          title: article.title,
          content: article.content,
          featured_image: article.featured_image,
          category_id: article.category_id,
          status: 'published',
          featured: Boolean(article.featured),
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      await fetchPosts();
    } catch (err) {
      setPostsError(err?.response?.data?.message || 'Failed to publish post');
    }
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

        {postsError && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900/40">
            {postsError}
          </div>
        )}

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
      </div>
    </AdminLayout>
  );
};

export default Posts;


