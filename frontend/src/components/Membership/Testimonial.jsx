import React, { useEffect, useMemo, useState } from 'react'
const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Legacy Stars of Ibadan turned our heritage into a living experience. The energy, respect, and teamwork were unmatched.',
    name: 'Zainab O.',
    title: 'Member, Community Partner',
  },
  {
    id: 't2',
    quote:
      'Their programs made culture feel personal—storytelling, workshops, and performances that truly honor Ibadan’s roots.',
    name: 'Samuel K.',
    title: 'Volunteer & Supporter',
  },
  {
    id: 't3',
    quote:
      'From planning to execution, Legacy Stars consistently delivered with heart. It’s more than an organization—it’s a family.',
    name: 'Folake T.',
    title: 'Participant',
  },
  {
    id: 't4',
    quote:
      'I’ve never seen such strong collaboration around tradition and youth growth. It’s inspiring and practical.',
    name: 'Oluwaseun R.',
    title: 'Mentor',
  },
]

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
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 6000)
    return () => clearInterval(t)
  }, [items])

  const active = items[index]

  return (
    <div className="relative">
      {/* Card */}
      <article className="rounded-2xl border border-[#E0D5C7] bg-white/80 shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-10 h-10 rounded-xl bg-[#B85C3C]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#B85C3C]"
              aria-hidden="true"
            >
              <path d="M21 15a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              <path d="M7 14l2-2-2-2" />
              <path d="M17 14l2-2-2-2" />
            </svg>
          </div>

          <div className="flex-1">
            <p className="font-body text-[#1A1A1A] text-lg leading-relaxed">
              “{active.quote}”
            </p>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="font-display font-bold text-[#B85C3C]">
                {active.name}
              </p>
              <span className="text-gray-600">• {active.title}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
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
                  i === index
                    ? 'w-10 bg-[#B85C3C]'
                    : 'w-2.5 bg-[#E0D5C7] hover:bg-[#D4A574]'
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

      {/* Accessibility note (hidden) */}
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Testimonials
            </h2>
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