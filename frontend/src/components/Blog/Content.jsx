import React from 'react'

// Mock data model (can be replaced later by API data)
const FEATURED_POSTS = [
  {
    id: 'heritage-festival-2025',
    categoryLabel: 'Events',
    title: 'Legacy Stars Ibadan Heritage Festival 2025: A Celebration of Culture',
    excerpt:
      'Join us for our annual heritage festival celebrating the rich traditions and cultural pride of Ibadan. This year promises spectacular performances, traditional crafts, and community gatherings.',
    author: 'Adekunle Okafor',
    dateLabel: '1/15/2025',
    readTimeLabel: '5 min read',
    imageSrc: '/images/cultural-heritage.jpg',
    href: '/blog/heritage-festival-2025',
  },
]

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
  )
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
  )
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
  )
}

function FeaturedHero({ post }) {
  return (
    <div className="container py-12 md:py-16 p-6">
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="order-2 md:order-1">
          <img
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            src={post.imageSrc}
          />
        </div>

        <div className="order-1 md:order-2">
          <span className="inline-block px-3 py-1 bg-[#B85C3C] text-white text-sm font-semibold rounded mb-4">
            {post.categoryLabel}
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-4 leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.excerpt}</p>

          <MetaRow
            author={post.author}
            dateLabel={post.dateLabel}
            readTimeLabel={post.readTimeLabel}
          />

          {/* Fix: remove nested <a> tags (invalid HTML) */}
          <a
            href={post.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300"
          >
            Read Full Article
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  const featuredPost = FEATURED_POSTS[0]

  return (
    <>
      <FeaturedHero post={featuredPost} />
    </>
  )
}

export default Content

