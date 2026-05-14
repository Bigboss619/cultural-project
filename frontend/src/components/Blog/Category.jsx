import React, { useState } from 'react';
import { Clock } from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'events', label: 'Events' },
  { id: 'community', label: 'Community' },
  { id: 'culture', label: 'Culture' },
  { id: 'impact', label: 'Impact' },
  { id: 'arts-culture', label: 'Arts & Culture' },
];

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'youth-mentorship-program',
    title: 'Launching Our New Youth Mentorship Program',
    description:
      'Legacy Stars introduces a comprehensive mentorship program connecting young community members with experienced leaders. Learn how you can participate as a mentor or mentee.',
    category: 'community',
    author: 'Zainab Adeleke',
    readTime: 4,
    date: '1/10/2025',
    image: '/images/traditions.jpg',
  },
  {
    id: 2,
    slug: 'preserving-yoruba-language',
    title: 'The Importance of Preserving the Yoruba Language',
    description:
      'An exploration of why preserving the Yoruba language is crucial for cultural identity and how Legacy Stars is contributing to this important mission.',
    category: 'culture',
    author: 'Dr. Adebayo Ogunwale',
    readTime: 6,
    date: '1/5/2025',
    image: '/images/hero-banner.jpg',
  },
  {
    id: 3,
    slug: 'community-service-impact',
    title: '2024 Community Service Impact Report',
    description:
      'A comprehensive overview of Legacy Stars\' community service initiatives in 2024, including volunteer hours, beneficiaries served, and future goals.',
    category: 'impact',
    author: 'Folake Adeyemi',
    readTime: 5,
    date: '12/28/2024',
    image: '/images/cultural-heritage.jpg',
  },
  {
    id: 4,
    slug: 'traditional-crafts-revival',
    title: 'Reviving Traditional Ibadan Crafts: Artisan Spotlight',
    description:
      'Meet the talented artisans keeping traditional Ibadan crafts alive. Learn about their work and how you can support local craftspeople.',
    category: 'arts-culture',
    author: 'Olamide Okafor',
    readTime: 4,
    date: '12/20/2024',
    image: '/images/traditions.jpg',
  },
];

// Color constants
const COLORS = {
  primary: '#B85C3C',
  light: '#F0EBE3',
  border: '#E0D5C7',
  text: '#1A1A1A',
  textSecondary: '#999',
};

// ============================================
// SUB-COMPONENTS
// ============================================

const CategoryButton = ({ category, isActive, onClick }) => {
  const isAllButton = category.id === 'all';
  const bgColor = isActive ? COLORS.primary : COLORS.light;
  const textColor = isActive ? 'white' : COLORS.text;
  const hoverClass = !isActive ? `hover:bg-[${COLORS.border}]` : '';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
        isActive ? 'shadow-md' : ''
      } ${hoverClass}`}
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
            src={post.image}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span
              className="inline-block px-3 py-1 text-white text-xs font-semibold rounded"
              style={{ backgroundColor: COLORS.primary }}
            >
              {CATEGORIES.find((cat) => cat.id === post.category)?.label}
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

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Footer: Author & Read Time */}
          <div
            className="flex items-center justify-between text-xs border-t pt-4 mt-auto"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <span>{post.author}</span>
            <div className="flex items-center gap-1">
              <Clock width={14} height={14} />
              <span>{post.readTime} min</span>
            </div>
          </div>

          {/* Date */}
          <div className="text-xs text-gray-400 mt-2">{post.date}</div>
        </div>
      </div>
    </a>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const Category = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts =
    activeCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

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
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;