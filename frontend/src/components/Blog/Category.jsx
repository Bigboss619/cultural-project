import React, { useState, useEffect, useCallback } from 'react';
import api from '../../config/axios';
import { Clock } from 'lucide-react';

// Color constants
const COLORS = {
  primary: '#B85C3C',
  light: '#F0EBE3',
  border: '#E0D5C7',
  text: '#1A1A1A',
  textSecondary: '#999',
};

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
};

// Helper to calculate read time
const calculateReadTime = (content) => {
  if (!content) return 1;
  return Math.max(1, Math.ceil(String(content).length / 1000));
};

// ============================================
// SUB-COMPONENTS
// ============================================

const CategoryButton = ({ category, isActive, onClick }) => {
  const bgColor = isActive ? COLORS.primary : COLORS.light;
  const textColor = isActive ? 'white' : COLORS.text;
  const hoverClass = !isActive ? 'hover:opacity-80' : '';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${hoverClass} ${
        isActive ? 'shadow-md' : ''
      }`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {category.label}
    </button>
  );
};

const BlogCard = ({ post }) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group cursor-pointer block h-full"
    >
      <div className="card-heritage overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">

        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <img
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={post.featured_image || '/images/traditions.jpg'}
          />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span
              className="inline-block px-3 py-1 text-white text-xs font-semibold rounded"
              style={{ backgroundColor: COLORS.primary }}
            >
              {post.category || 'Uncategorized'}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">

          {/* Title */}
          <h3
            className="text-xl font-display font-bold mb-3 group-hover:text-[#B85C3C] transition-colors duration-300 line-clamp-2"
            style={{ color: COLORS.text }}
          >
            {post.title}
          </h3>

          {/* Description / Summary */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.summary || ''}
          </p>

          {/* Footer: Author & Read Time */}
          <div
            className="flex items-center justify-between text-xs border-t pt-4 mt-auto"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <span>Legacy Stars Team</span>
            <div className="flex items-center gap-1">
              <Clock width={14} height={14} />
              <span>{calculateReadTime(post.content)} min</span>
            </div>
          </div>

          {/* Date */}
          <div className="text-xs text-gray-400 mt-2">{formatDate(post.created_at)}</div>
        </div>
      </div>
    </a>
  );
};

// Loading skeleton
const BlogCardSkeleton = () => (
  <div className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white rounded-lg">
    <div className="relative overflow-hidden h-48 animate-pulse bg-gray-200"></div>
    <div className="p-6 flex flex-col flex-grow space-y-3">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      <div className="mt-auto pt-4 border-t">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

const Category = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build unique categories from posts
  const getCategoriesFromPosts = useCallback((postsData) => {
    const categoryMap = new Map();
    categoryMap.set('all', { id: 'all', label: 'All' });

    postsData.forEach((post) => {
      if (post.category_id && post.category && !categoryMap.has(post.category_id)) {
        categoryMap.set(post.category_id, {
          id: post.category_id,
          label: post.category,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, []);

  const fetchPosts = useCallback(async (categoryId = null) => {
    try {
      setLoading(true);
      setError(null);

      const params = categoryId && categoryId !== 'all' ? { category_id: categoryId } : {};
      const resp = await api.get('/public/posts', { params });

      const postsData = resp.data?.posts || [];
      setPosts(postsData);

      // Build categories from posts if not already set
      if (categories.length === 0) {
        setCategories(getCategoriesFromPosts(postsData));
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Failed to load posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [categories.length, getCategoriesFromPosts]);

  useEffect(() => {
    fetchPosts(activeCategory === 'all' ? null : activeCategory);
  }, [activeCategory, fetchPosts]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      {/* Category Filter Section */}
      <div
        className="bg-white border-t border-b py-8 p-4"
        style={{ borderColor: COLORS.border }}
      >
        <div className="container">
          <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.length === 0 && (
              <>
                <CategoryButton
                  category={{ id: 'all', label: 'All' }}
                  isActive={activeCategory === 'all'}
                  onClick={() => handleCategoryClick('all')}
                />
              </>
            )}
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container py-12 md:py-16">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => fetchPosts(activeCategory === 'all' ? null : activeCategory)}
              className="mt-4 px-4 py-2 bg-[#B85C3C] text-white rounded hover:bg-[#A04A2E]"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No posts found.</p>
              </div>
            ) : (
              posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;