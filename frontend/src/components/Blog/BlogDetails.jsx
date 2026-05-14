import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================

const ARTICLE_DATA = {
  id: 1,
  title: 'Legacy Stars Ibadan Heritage Festival 2025: A Celebration of Culture',
  image: '/images/cultural-heritage.jpg',
  author: 'Adekunle Okafor',
  authorBio:
    'Adekunle Okafor is a dedicated member of Legacy Stars of Ibadan contributing insightful articles about our community and cultural initiatives.',
  publishDate: 'June 10, 2025',
  readTime: 8,
  category: 'Events',
  intro:
    'The Legacy Stars of Ibadan is thrilled to announce the 2025 Heritage Festival, our most ambitious cultural celebration yet. This year\'s festival will showcase the best of Ibadan\'s traditions, bringing together community members, cultural enthusiasts, and visitors from around the world.',
  content: [
    {
      type: 'heading',
      text: 'Festival Highlights',
    },
    {
      type: 'intro',
      text: 'Our three-day festival will feature:',
    },
    {
      type: 'highlight',
      title: 'Traditional Performances',
      description:
        'Experience authentic Yoruba music, dance, and theatrical performances that have been passed down through generations. Our performers include renowned artists and emerging talents from the community.',
    },
    {
      type: 'highlight',
      title: 'Artisan Marketplace',
      description:
        'Discover handcrafted items from local artisans, including traditional textiles, pottery, beadwork, and carved sculptures. This is an excellent opportunity to support local craftspeople and take home authentic cultural pieces.',
    },
    {
      type: 'highlight',
      title: 'Educational Workshops',
      description:
        'Learn about Ibadan\'s history, language, and traditions through interactive workshops led by community elders and historians. Topics include Yoruba language basics, traditional cooking, and cultural etiquette.',
    },
    {
      type: 'highlight',
      title: 'Community Feast',
      description:
        'Enjoy traditional Ibadan cuisine prepared by renowned cooks. Sample dishes like jollof rice, pepper soups, and traditional delicacies that have been family recipes for generations.',
    },
    {
      type: 'highlight',
      title: 'Youth Programs',
      description:
        'Special activities designed for young people to connect with their heritage, including dance lessons, storytelling sessions, and cultural mentorship programs.',
    },
    {
      type: 'heading',
      text: 'When and Where',
    },
    {
      type: 'details',
      items: [
        { label: 'Dates', value: 'June 15-17, 2025' },
        { label: 'Location', value: 'Ibadan Cultural Center, Oyo State' },
        { label: 'Time', value: '10:00 AM - 8:00 PM daily' },
      ],
    },
    {
      type: 'paragraph',
      text: 'Early bird registration is now open with a 20% discount for members. Visit our events page to secure your spot today!',
    },
  ],
};

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

const ArticleContent = ({ article }) => (
  <article className="prose prose-lg max-w-none">
    <div className="text-gray-700 leading-relaxed space-y-6">
      <p className="text-gray-700">{article.intro}</p>

      {article.content.map((block, idx) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={idx}
              className="text-3xl font-display font-bold mt-8 mb-4"
              style={{ color: COLORS.text }}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'intro') {
          return (
            <p key={idx} className="text-gray-700 font-semibold">
              {block.text}
            </p>
          );
        }

        if (block.type === 'highlight') {
          return (
            <div key={idx} className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2">{block.title}</h3>
              <p className="text-gray-700">{block.description}</p>
            </div>
          );
        }

        if (block.type === 'details') {
          return (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg mb-4">
              {block.items.map((item, i) => (
                <p key={i} className="text-gray-700 mb-2">
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="text-gray-700">
              {block.text}
            </p>
          );
        }

        return null;
      })}
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
      // Handle social share
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

const AuthorBox = ({ author, bio }) => (
  <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: COLORS.light }}>
    <h4
      className="text-sm font-semibold uppercase tracking-wide mb-3"
      style={{ color: COLORS.accent }}
    >
      About the Author
    </h4>
    <p className="text-gray-700 text-sm">
      <strong>{author}</strong> - {bio}
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

// ============================================
// MAIN COMPONENT
// ============================================

export const BlogDetails = () => {
  return (
    <>
      {/* Article Hero Image */}
      <ArticleImage src={ARTICLE_DATA.image} alt={ARTICLE_DATA.title} />

      {/* Main Content Layout */}
      <div className="container max-w-3xl py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Main Article Content */}
          <div className="md:col-span-2">
            <ArticleContent article={ARTICLE_DATA} />
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <ShareArticle />
            <AuthorBox
              author={ARTICLE_DATA.author}
              bio={ARTICLE_DATA.authorBio}
            />
            <SubscribeBox />
          </div>
        </div>
      </div>
    </>
  );
}
