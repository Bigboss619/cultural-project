import React, { useEffect, useRef, useState } from 'react'

const DEFAULT_EXECUTIVES = [
  {
    id: 'e1',
    name: 'Legacy - Mogaji Abayomi Gbadamosi',
    position: 'President',
    image_url: '/images/portfolio/executive-1.jpg',
    bio: null,
  },
  {
    id: 'e2',
    name: 'Legacy Alhaji Akeem Hussein',
    position: 'Vice President',
    image_url: '/images/portfolio/executive-2.jpg',
    bio: null,
  },
  {
    id: 'e3',
    name: 'Legacy - Folarin Saheed',
    position: 'General Secretary',
    image_url: '/images/portfolio/executive-3.jpg',
    bio: null,
  },
  {
    id: 'e4',
    name: 'Legacy - Adekunle Safiu',
    position: 'Director of Finance',
    image_url: '/images/portfolio/executive-4.jpg',
    bio: null,
  },
  {
    id: 'e5',
    name: 'Legacy - Bukunmi Olugbade',
    position: 'Director of Socials',
    image_url: '/images/portfolio/executive-4.jpg',
    bio: null,
  },
]

const Portfolio = () => {
  const [executives, setExecutives] = useState(DEFAULT_EXECUTIVES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const resp = await fetch('/api/public/executives')
        if (resp.ok) {
          const data = await resp.json()
          if (data.executives && data.executives.length > 0) {
            setExecutives(data.executives)
          }
        }
      } catch (err) {
        console.warn('Failed to fetch executives, using defaults')
      } finally {
        setLoading(false)
      }
    }

    fetchExecutives()
  }, [])

  const itemsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (index) => {
    const el = itemsRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(index, executives.length - 1))
    const child = el.children[clamped]
    if (!child) return

    child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  useEffect(() => {
    const el = itemsRef.current
    if (!el) return

    const onScroll = () => {
      const children = Array.from(el.children)
      if (!children.length) return

      const left = el.scrollLeft
      let bestIndex = 0
      let bestDistance = Infinity

      children.forEach((child, idx) => {
        const d = Math.abs(child.offsetLeft - left)
        if (d < bestDistance) {
          bestDistance = d
          bestIndex = idx
        }
      })

      setActiveIndex(bestIndex)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = itemsRef.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    let lastInvokedAt = 0
    const id = setInterval(() => {
      const now = Date.now()
      if (now - lastInvokedAt < 300) return

      lastInvokedAt = now

      setActiveIndex((prev) => {
        const next = prev + 1 >= executives.length ? 0 : prev + 1
        const child = el.children[next]
        if (child) {
          el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
        }
        return next
      })
    }, 4000)

    return () => clearInterval(id)
  }, [executives.length])

  if (loading) {
    return (
      <section className='py-20 md:py-32 bg-white'>
        <div className='container mx-auto px-4 md:px-8'>
          <div className='text-center mb-12 md:mb-16'>
            <span className='text-[#D4A574] font-accent text-lg font-semibold'>
              Our Executives
            </span>
            <h2 className='font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-4'>
              Leadership at a Glance
            </h2>
            <p className='font-body text-lg text-gray-600 max-w-2xl mx-auto'>
              Meet the team guiding our mission with integrity, excellence, and cultural pride.
            </p>
          </div>
          <div className='flex justify-center items-center h-64'>
            <div className='w-10 h-10 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin'></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 md:py-32 bg-white'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='text-center mb-12 md:mb-16'>
          <span className='text-[#D4A574] font-accent text-lg font-semibold'>
            Our Executives
          </span>
          <h2 className='font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-4'>
            Leadership at a Glance
          </h2>
          <p className='font-body text-lg text-gray-600 max-w-2xl mx-auto'>
            Meet the team guiding our mission with integrity, excellence, and cultural pride.
          </p>
        </div>

        <div className='relative'>
          <button
            type='button'
            aria-label='Previous executive'
            onClick={() => scrollToIndex(activeIndex - 1)}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-[#1A1A1A] hover:shadow-xl transition-shadow'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>

          <button
            type='button'
            aria-label='Next executive'
            onClick={() => scrollToIndex(activeIndex + 1)}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-[#1A1A1A] hover:shadow-xl transition-shadow'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>

          <div
            ref={itemsRef}
            className='flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-2 md:px-0'
            style={{ scrollbarWidth: 'none' }}
          >
            {executives.map((exec) => (
              <div
                key={exec.id}
                className='snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[32%]'
              >
                <div className='card-heritage h-full rounded-lg'>
                  <div className='relative overflow-hidden rounded-lg'>
                    <div className='absolute -top-10 -right-10 w-28 h-28 bg-[#D4A574] opacity-20 blur-2xl rounded-full' />
                    <div className='absolute -bottom-10 -left-10 w-28 h-28 bg-[#B85C3C] opacity-10 blur-2xl rounded-full' />

                    <img
                      src={exec.image_url || '/images/cultural-heritage.jpg'}
                      alt={exec.name}
                      className='w-full aspect-square object-cover rounded-lg border border-gray-100'

                      loading='lazy'
                      onError={(e) => {
                        e.currentTarget.src = '/images/cultural-heritage.jpg'
                      }}
                    />
                  </div>

                  <div className='mt-6'>
                    <div className='inline-flex items-center gap-2 mb-3'>
                      <span className='w-2.5 h-2.5 rounded-full bg-[#B85C3C]' />
                      <p className='font-body text-sm text-gray-600'>{exec.position}</p>
                    </div>
                    <h3 className='font-display text-2xl font-bold text-[#1A1A1A]'>{exec.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-10 gap-2'>
            {executives.map((exec, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={exec.id}
                  type='button'
                  aria-label={`Go to executive ${idx + 1}`}
                  onClick={() => scrollToIndex(idx)}
                  className={
                    isActive
                      ? 'w-3 h-3 rounded-full bg-[#D4A574] shadow-md'
                      : 'w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-[#D4A574] transition-colors'
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio