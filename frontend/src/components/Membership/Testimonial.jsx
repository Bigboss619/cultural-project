import React, { useEffect, useMemo, useState } from 'react'

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Legacy Stars of Ibadan turned our heritage into a living experience. The energy, respect, and teamwork were unmatched.',
    name: 'Zainab O.',
    title: 'Member, Community Partner',
    image: { label: 'ZO', gradientFrom: '#B85C3C', gradientTo: '#1A1A1A' },
  },
  {
    id: 't2',
    quote:
      'Their programs made culture feel personal—storytelling, workshops, and performances that truly honor Ibadan’s roots.',
    name: 'Samuel K.',
    title: 'Volunteer & Supporter',
    image: { label: 'SK', gradientFrom: '#D4A574', gradientTo: '#B85C3C' },
  },
  {
    id: 't3',
    quote:
      'From planning to execution, Legacy Stars consistently delivered with heart. It’s more than an organization—it’s a family.',
    name: 'Folake T.',
    title: 'Participant',
    image: { label: 'FT', gradientFrom: '#1A1A1A', gradientTo: '#B85C3C' },
  },
  {
    id: 't4',
    quote:
      'I’ve never seen such strong collaboration around tradition and youth growth. It’s inspiring and practical.',
    name: 'Oluwaseun R.',
    title: 'Mentor',
    image: { label: 'OR', gradientFrom: '#8B4423', gradientTo: '#D4A574' },
  },
]


function TestimonialAvatar({ image }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm"
      style={{
        backgroundImage: `linear-gradient(135deg, ${image.gradientFrom}, ${image.gradientTo})`,
      }}
      aria-hidden="true"
    >
      <div className="text-white text-lg font-display font-bold">{image.label}</div>
    </div>
  )
}

function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0)

  const goTo = (nextIndex) => {
    const len = items.length
    setIndex(((nextIndex % len) + len) % len)
  }

  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  useEffect(() => {
    if (!items?.length) return
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [items])

  const active = items[index]

  return (
    <div className="relative">
      <article className="rounded-2xl border border-[#E0D5C7] bg-white/80 shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          {/* picture */}
          <TestimonialAvatar image={active.image} />

          <div className="flex-1">
            <p className="font-body text-[#1A1A1A] text-lg leading-relaxed">
              “{active.quote}”
            </p>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="font-display font-bold text-[#B85C3C]">{active.name}</p>
              <span className="text-gray-600">• {active.title}</span>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-xl border border-[#E0D5C7] bg-white hover:bg-[#F0EBE3] transition-colors duration-300 text-[#B85C3C]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-10 bg-[#B85C3C]' : 'w-2.5 bg-[#E0D5C7] hover:bg-[#D4A574]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-xl border border-[#E0D5C7] bg-white hover:bg-[#F0EBE3] transition-colors duration-300 text-[#B85C3C]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </article>

      <p className="sr-only" aria-live="polite">
        {index + 1} of {items.length}
      </p>
    </div>
  )
}

const Testimonial = () => {
    const testimonials = useMemo(() => TESTIMONIALS, [])
  return (
    <>
          {/* Testimonials */}
      <section className="bg-[#F0EBE3] border-t border-[#E0D5C7] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">Testimonials</h2>
            <p className="font-body text-gray-700 mt-3 max-w-2xl">
              What people are saying about <span className="text-[#B85C3C] font-semibold">Legacy Stars</span>.
            </p>
          </div>

          <TestimonialCarousel items={testimonials} />
        </div>
      </section>
    </>
  )
}

export default Testimonial