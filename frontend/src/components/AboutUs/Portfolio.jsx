import React, { useEffect, useMemo, useRef, useState } from 'react'

const Portfolio = () => {
  const executives = useMemo(
    () => [
      {
        name: 'Alhaji Femi Adebayo',
        title: 'Chairman',
        imageSrc: '/images/portfolio/executive-1.jpg',
      },
      {
        name: 'Chief (Mrs.) Kehinde Olayemi',
        title: 'Secretary',
        imageSrc: '/images/portfolio/executive-2.jpg',
      },
      {
        name: 'Dr. Tunde Adewale',
        title: 'Coordinator',
        imageSrc: '/images/portfolio/executive-3.jpg',
      },
      {
        name: 'Engr. Sola Ajibola',
        title: 'Treasurer',
        imageSrc: '/images/portfolio/executive-4.jpg',
      },
    ],
    []
  )

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
                key={exec.name}
                className='snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[32%]'
              >
                <div className='card-heritage h-full rounded-lg'>
                  <div className='relative overflow-hidden rounded-lg'>
                    <div className='absolute -top-10 -right-10 w-28 h-28 bg-[#D4A574] opacity-20 blur-2xl rounded-full' />
                    <div className='absolute -bottom-10 -left-10 w-28 h-28 bg-[#B85C3C] opacity-10 blur-2xl rounded-full' />

                    <img
                      src={exec.imageSrc}
                      alt={exec.name}
                      className='w-full h-72 object-cover rounded-lg border border-gray-100'
                      loading='lazy'
                      onError={(e) => {
                        // Keep layout intact even if placeholder image isn't present.
                        e.currentTarget.src = '/images/cultural-heritage.jpg'
                      }}
                    />
                  </div>

                  <div className='mt-6'>
                    <div className='inline-flex items-center gap-2 mb-3'>
                      <span className='w-2.5 h-2.5 rounded-full bg-[#B85C3C]' />
                      <p className='font-body text-sm text-gray-600'>{exec.title}</p>
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
                  key={exec.name}
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
