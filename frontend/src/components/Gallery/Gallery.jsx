import React, { useEffect, useState } from 'react'

const DEFAULT_GALLERY = [
  {
    id: 'heritage-festival-2024',
    category: 'Events',
    title: 'Heritage Festival 2024',
    image_url: '/images/gallery/heritage-festival.jpg',
    caption: null,
  },
  {
    id: 'traditional-dance',
    category: 'Culture',
    title: 'Traditional Dance Performance',
    image_url: '/images/gallery/traditional-dance.jpg',
    caption: null,
  },
  {
    id: 'community-gathering',
    category: 'Community',
    title: 'Community Gathering',
    image_url: '/images/gallery/community-gathering.jpg',
    caption: null,
  },
  {
    id: 'artisan-marketplace',
    category: 'Arts & Culture',
    title: 'Artisan Marketplace',
    image_url: '/images/gallery/artisan-marketplace.jpg',
    caption: null,
  },
  {
    id: 'youth-mentorship',
    category: 'Community',
    title: 'Youth Mentorship Program',
    image_url: '/images/gallery/youth-mentorship.jpg',
    caption: null,
  },
  {
    id: 'yoruba-language-workshop',
    category: 'Culture',
    title: 'Yoruba Language Workshop',
    image_url: '/images/gallery/yoruba-language.jpg',
    caption: null,
  },
]

function ImagePlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg'
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

function GalleryCard({ category, title, image_url, caption }) {
  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative w-full h-64 bg-gradient-to-br from-[#B85C3C] to-[#8B4423] flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-[#F0EBE3] text-[#B85C3C] text-xs font-semibold rounded mb-3">
          {category}
        </span>
        <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#B85C3C] transition-colors duration-300">
          {title}
        </h3>
        {caption && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{caption}</p>
        )}
      </div>
    </article>
  )
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState(DEFAULT_GALLERY)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const resp = await fetch('/api/public/gallery')
        if (resp.ok) {
          const data = await resp.json()
          if (data.gallery && data.gallery.length > 0) {
            setGalleryItems(data.gallery)
          }
        }
      } catch (err) {
        console.warn('Failed to fetch gallery, using defaults')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <section className="container py-12 md:py-16 md:p-12 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-[#B85C3C] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-12 md:py-16 md:p-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        {galleryItems.map((item) => (
          <GalleryCard
            key={item.id}
            category={item.category}
            title={item.title}
            image_url={item.image_url}
            caption={item.caption}
          />
        ))}
      </div>
    </section>
  )
}

export default Gallery