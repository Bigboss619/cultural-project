import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-right"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MetaRow({ author, dateLabel, readTimeLabel }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
      <span>{author}</span>
      <span>•</span>
      <span>{dateLabel}</span>
      <span>•</span>
      <div className="flex items-center gap-1">
        <ClockIcon />
        <span>{readTimeLabel}</span>
      </div>
    </div>
  );
}

function FeaturedHero({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="container py-12 md:py-16 p-6">
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="order-2 md:order-1">
          <img
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            src={post.featured_image || '/images/cultural-heritage.jpg'}
          />
        </div>

        <div className="order-1 md:order-2">
          <span className="inline-block px-3 py-1 bg-[#B85C3C] text-white text-sm font-semibold rounded mb-4">
            {post.category || 'Uncategorized'}
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-4 leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.summary}</p>

          <MetaRow
            author="Legacy Stars Team"
            dateLabel={formatDate(post.created_at)}
            readTimeLabel={`${Math.max(1, Math.ceil((post.content || '').length / 1000))} min read`}
          />

          <a
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300"
          >
            Read Full Article
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await axios.get('/api/public/posts/featured');
        if (resp.data?.post) {
          setFeaturedPost(resp.data.post);
        }
      } catch (err) {
        console.error('Failed to fetch featured post:', err);
        setError('Failed to load featured post');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPost();
  }, []);

  if (loading) {
    return (
      <div className="container py-12 md:py-16 p-6">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !featuredPost) {
    return null;
  }

  return (
    <>
      <FeaturedHero post={featuredPost} />
    </>
  );
};

export default Content;