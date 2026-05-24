import React, { useEffect, useState } from 'react';
import api from '../../config/axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const resp = await api.get('/api/public/members');
        setMembers(resp.data.members || []);
      } catch (err) {
        console.error('Failed to fetch members:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <main>
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B85C3C]"></div>
          </div>
        </section>
      </main>
    );
  }

  if (members.length === 0) {
    return (
      <main>
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-6xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Members
            </h2>
            <p className="font-body text-gray-700 mt-3 max-w-2xl">
              A dedicated team committed to celebrating Ibadan&apos;s cultural heritage, mentoring youth, and strengthening community pride.
            </p>
          </div>
          <p className="text-gray-500 text-center py-8">No members found.</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Members */}
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-6xl">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Members
          </h2>
          <p className="font-body text-gray-700 mt-3 max-w-2xl">
            A dedicated team committed to celebrating Ibadan&apos;s cultural heritage, mentoring youth, and strengthening community pride.
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
                  {m.image_url ? (
                    <img
                      src={`http://localhost:5000${m.image_url}`}
                      alt={m.name}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #B85C3C, #1A1A1A)',
                      }}
                    >
                      <div className="text-white text-xl font-display font-bold">
                        {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold text-[#1A1A1A] truncate">
                      {m.name}
                    </h3>
                    <p className="font-body text-[#B85C3C] font-semibold">{m.role}</p>
                  </div>
                </div>

                <p className="font-body text-gray-700 mt-4 leading-relaxed">{m.bio}</p>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-[#B85C3C] via-[#D4A574] to-[#E0D5C7]" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Members;