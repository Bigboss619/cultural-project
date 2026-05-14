import React from 'react'

const GALLERY_ITEMS = [
  {
    id: 'heritage-festival-2024',
    category: 'Events',
    title: 'Heritage Festival 2024',
  },
  {
    id: 'traditional-dance',
    category: 'Culture',
    title: 'Traditional Dance Performance',
  },
  {
    id: 'community-gathering',
    category: 'Community',
    title: 'Community Gathering',
  },
  {
    id: 'artisan-marketplace',
    category: 'Arts & Culture',
    title: 'Artisan Marketplace',
  },
  {
    id: 'youth-mentorship',
    category: 'Community',
    title: 'Youth Mentorship Program',
  },
  {
    id: 'yoruba-language-workshop',
    category: 'Culture',
    title: 'Yoruba Language Workshop',
  },
]

function ImagePlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image text-white/30"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function GalleryCard({ category, title }) {
  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative w-full h-64 bg-gradient-to-br from-[#B85C3C] to-[#8B4423] flex items-center justify-center overflow-hidden">
        <ImagePlaceholderIcon />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-[#F0EBE3] text-[#B85C3C] text-xs font-semibold rounded mb-3">
          {category}
        </span>
        <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#B85C3C] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </article>
  )
}

const Gallery = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item) => (
          <GalleryCard key={item.id} category={item.category} title={item.title} />
        ))}
      </div>
    </section>
  )
}

export default Gallery

