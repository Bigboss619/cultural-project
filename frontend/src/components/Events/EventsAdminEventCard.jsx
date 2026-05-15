import React from 'react';

function Badge({ children }) {
  return (
    <span className="inline-block px-3 py-1 bg-[#F0EBE3] text-[#B85C3C] text-xs font-semibold rounded mb-3">
      {children}
    </span>
  );
}

function MetaRow({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default function EventsAdminEventCard({ event }) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-l-4 border-[#B85C3C]">
      <div className="p-5 md:p-6">
        <Badge>{event.category}</Badge>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#1A1A1A]">{event.title}</h3>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">RSVP</div>
            <div className="font-semibold">
              {event.rsvp?.enabled ? (
                <span className="text-[#2D5016]">Enabled · {event.rsvp.accepted}/{event.rsvp.seats} accepted</span>
              ) : (
                <span className="text-gray-600">Disabled</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
          <MetaRow label={event.dateLabel} value={event.dateValue} />
          <MetaRow label={event.timeLabel} value={event.timeValue} />
          <MetaRow label={event.locationLabel} value={event.locationValue} />
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500">{event.ticketLinksLabel}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {event.ticketLinks?.length ? (
              event.ticketLinks.map((t, idx) => (
                <a
                  key={`${t.url}-${idx}`}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300"
                >
                  {t.label}
                </a>
              ))
            ) : (
              <span className="text-gray-600">No ticket links added</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

