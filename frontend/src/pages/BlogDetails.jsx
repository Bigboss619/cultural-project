import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Share2 } from 'lucide-react';
import Container from '../components/layout/Container';

const SHARE_OPTIONS = [
  { name: 'Facebook', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
  { name: 'Twitter', color: 'bg-blue-400', hoverColor: 'hover:bg-blue-500' },
  { name: 'Instagram', color: 'bg-pink-600', hoverColor: 'hover:bg-pink-700' },
  { name: 'Copy Link', color: 'bg-gray-700', hoverColor: 'hover:bg-gray-800' },
];

const COLORS = {
  primary: '#B85C3C',
  secondary: '#8B4423',
  light: '#F0EBE3',
  text: '#1A1A1A',
  accent: '#2D5016',
  accentDark: '#1A3009',
  focus: '#D4A574',
};

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Calculate read time
const calculateReadTime = (content) => {
  if (!content) return 1;
  return Math.max(1, Math.ceil(String(content).length / 1000));
};

// ============================================
// SUB-COMPONENTS
// ============================================

const ArticleImage = ({ src, alt }) => (
  <div className="container max-w-3xl py-8">
    <img
      alt={alt}
      className="w-full h-96 object-cover rounded-lg shadow-lg"
      src={src}
    />
  </div>
);

const ArticleContent = ({ content, summary }) => (
  <article className="prose prose-lg max-w-none">
    <div className="text-gray-700 leading-relaxed space-y-6">
      {/* Summary/Intro */}
      {summary && (
        <p className="text-xl font-semibold text-gray-700 border-l-4 border-[#B85C3C] pl-4 my-6">
          {summary}
        </p>
      )}

      {/* Main content - render HTML directly */}
      {content && (
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  </article>
);

const ShareArticle = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform) => {
    if (platform === 'Copy Link') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.log(`Sharing to ${platform}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-8">
      <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.text }}>
        <Share2 size={20} />
        Share Article
      </h3>
      <div className="space-y-3">
        {SHARE_OPTIONS.map((option) => (
          <button
            key={option.name}
            onClick={() => handleShare(option.name)}
            className={`w-full px-4 py-2 text-white rounded-lg transition-colors duration-300 text-sm font-medium ${option.color} ${option.hoverColor}`}
          >
            {copied && option.name === 'Copy Link' ? '✓ Copied!' : option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const AuthorBox = ({ author }) => (
  <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: COLORS.light }}>
    <h4
      className="text-sm font-semibold uppercase tracking-wide mb-3"
      style={{ color: COLORS.accent }}
    >
      About the Author
    </h4>
    <p className="text-gray-700 text-sm">
      <strong>{author || 'Legacy Stars Team'}</strong> - Dedicated contributor to Legacy Stars of Ibadan's cultural initiatives.
    </p>
  </div>
);

const SubscribeBox = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div
      className="text-white rounded-lg p-6"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.secondary})`,
      }}
    >
      <h4 className="font-display font-bold text-lg mb-2">Stay Updated</h4>
      <p className="text-sm text-[#F9F7F4] mb-4">
        Subscribe to get more stories like this.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded text-[#1A1A1A] text-sm focus:outline-none focus:ring-2"
          style={{ focusRingColor: COLORS.focus }}
        />
        <button
          type="submit"
          className="w-full px-3 py-2 text-white text-sm font-semibold rounded transition-colors duration-300"
          style={{
            backgroundColor: COLORS.accent,
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = COLORS.accentDark)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = COLORS.accent)
          }
        >
          {submitted ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center py-16">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
    <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
    <a
      href="/blog"
      className="px-6 py-3 bg-[#B85C3C] text-white rounded-lg hover:bg-[#A04A2E] transition-colors"
    >
      Back to Blog
    </a>
  </div>
);

const LoadingState = () => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center">
    <div className="animate-pulse space-y-6 w-full max-w-3xl px-4">
      <div className="h-96 bg-gray-200 rounded-lg w-full"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
const Details = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const resp = await axios.get(`/api/public/posts/slug/${slug}`);

        if (resp.data?.post) {
          setPost(resp.data.post);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError(err?.response?.data?.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !post) {
    return <NotFound />;
  }

  return (
    <>
      <div className="bg-[#F3F4F6] min-h-screen flex flex-col justify-center items-center text-center">
        {/* Article Hero Image */}
        <ArticleImage
          src={post.featured_image || '/images/cultural-heritage.jpg'}
          alt={post.title}
        />

        {/* Main Content Layout */}
        <div className="container max-w-3xl py-12 md:py-16">
          {/* Article Header */}
          <div className="mb-8">
            <span
              className="inline-block px-3 py-1 text-white text-sm font-semibold rounded mb-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              {post.category || 'Uncategorized'}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>{formatDate(post.created_at)}</span>
              <span>•</span>
              <span>{calculateReadTime(post.content)} min read</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">

            {/* Main Article Content */}
            <div className="md:col-span-2">
              <ArticleContent
                content={post.content}
                summary={post.summary}
              />
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <ShareArticle />
              <AuthorBox author="Legacy Stars Team" />
              <SubscribeBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BlogDetails = () => {
  return (
    <Container>
      <Details />
    </Container>
  );
};

export default BlogDetails;