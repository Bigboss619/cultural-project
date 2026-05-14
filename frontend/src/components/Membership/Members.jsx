import React, { useEffect, useMemo, useState } from 'react'

const MEMBERS = [
  {
    id: 'adebayo',
    name: 'Tayo Adebayo',
    role: 'Cultural Curator',
    bio: 'Brings Ibadan’s oral traditions to life through storytelling circles and community exhibitions.',
    image: {
      label: 'TA',
      gradientFrom: '#B85C3C',
      gradientTo: '#1A1A1A',
    },
  },
  {
    id: 'olakunle',
    name: 'Kolawole Olakunle',
    role: 'Youth Ambassador',
    bio: 'Leads mentorship initiatives that connect young leaders with heritage projects and volunteer drives.',
    image: {
      label: 'KO',
      gradientFrom: '#D4A574',
      gradientTo: '#B85C3C',
    },
  },
  {
    id: 'babatunde',
    name: 'Aminat Babatunde',
    role: 'Community Liaison',
    bio: 'Builds bridges across neighborhoods—coordinating events that celebrate culture, unity, and pride.',
    image: {
      label: 'AB',
      gradientFrom: '#1A1A1A',
      gradientTo: '#B85C3C',
    },
  },
  {
    id: 'adebisi',
    name: 'Segun Adebisi',
    role: 'Heritage Coordinator',
    bio: 'Organizes preservation efforts and heritage walks to keep history visible for future generations.',
    image: {
      label: 'SA',
      gradientFrom: '#8B4423',
      gradientTo: '#D4A574',
    },
  },
  {
    id: 'oshun',
    name: 'Kemi Oshun',
    role: 'Arts & Performance Lead',
    bio: 'Supports dance, drumming, and stagecraft—helping performers share authentic Ibadan expressions.',
    image: {
      label: 'KO',
      gradientFrom: '#B85C3C',
      gradientTo: '#D4A574',
    },
  },
]


function Avatar({ image }) {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
      style={{
        backgroundImage: `linear-gradient(135deg, ${image.gradientFrom}, ${image.gradientTo})`,
      }}
      aria-hidden="true"
    >
      <div className="text-white text-xl font-display font-bold">
        {image.label}
      </div>
    </div>
  )
}



const Members = () => {
  const members = useMemo(() => MEMBERS, [])
  

  return (
    <main>
      {/* Members */}
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-6xl">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Members
          </h2>
          <p className="font-body text-gray-700 mt-3 max-w-2xl">
            A dedicated team committed to celebrating Ibadan’s cultural heritage, mentoring youth, and strengthening community pride.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {members.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-[#E0D5C7] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar image={m.image} />
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold text-[#1A1A1A] truncate">
                      {m.name}
                    </h3>
                    <p className="font-body text-[#B85C3C] font-semibold">
                      {m.role}
                    </p>
                  </div>
                </div>

                <p className="font-body text-gray-700 mt-4 leading-relaxed">
                  {m.bio}
                </p>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-[#B85C3C] via-[#D4A574] to-[#E0D5C7]" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

     
    </main>
  )
}

export default Members

