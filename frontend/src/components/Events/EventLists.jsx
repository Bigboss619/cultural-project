import React, { useState, useEffect } from 'react';
import api from '../../config/axios';

function CalendarIcon() {
  return (
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
      className="lucide lucide-calendar text-[#B85C3C]"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
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
      className="lucide lucide-clock text-[#B85C3C]"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon() {
  return (
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
      className="lucide lucide-map-pin text-[#B85C3C]"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EventMetaRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

// Format date for display
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return 'Date TBA';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Normalize event from API
const normalizeEvent = (event) => ({
  id: event.id,
  title: event.title,
  category: event.category || 'Event',
  dateLabel: 'Date',
  dateValue: event.end_date
    ? `${formatDateDisplay(event.start_date)} - ${formatDateDisplay(event.end_date)}`
    : formatDateDisplay(event.start_date),
  timeLabel: 'Time',
  timeValue: event.start_time && event.end_time
    ? `${event.start_time} - ${event.end_time}`
    : event.start_time || 'Time TBA',
  locationLabel: 'Location',
  locationValue: event.location || 'Location TBA',
  ctaLabel: 'Register Now',
  description: event.description || '',
  rsvp_enabled: event.rsvp_enabled || false,
  rsvp_seats: event.rsvp_seats || 0,
  rsvp_accepted: event.rsvp_accepted || 0,
  ticket_links: event.ticket_links || [],
});

function EventCard({ event }) {
  const normalizedEvent = normalizeEvent(event);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-l-4 border-[#B85C3C]">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-[#F0EBE3] text-[#B85C3C] text-xs font-semibold rounded mb-3">
              {normalizedEvent.category}
            </span>
            <h3 className="text-2xl font-display font-bold text-[#1A1A1A]">{normalizedEvent.title}</h3>
          </div>

          <a
            href={normalizedEvent.ticket_links[0]?.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300 whitespace-nowrap"
          >
            {normalizedEvent.ctaLabel}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-gray-600">
          <EventMetaRow
            icon={<CalendarIcon />}
            label={normalizedEvent.dateLabel}
            value={normalizedEvent.dateValue}
          />
          <EventMetaRow icon={<ClockIcon />} label={normalizedEvent.timeLabel} value={normalizedEvent.timeValue} />
          <EventMetaRow
            icon={<MapPinIcon />}
            label={normalizedEvent.locationLabel}
            value={normalizedEvent.locationValue}
          />
        </div>

        {normalizedEvent.description && (
          <p className="mt-4 text-gray-600 text-sm line-clamp-2">{normalizedEvent.description}</p>
        )}

        {normalizedEvent.rsvp_enabled && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              RSVP available • {normalizedEvent.rsvp_accepted}/{normalizedEvent.rsvp_seats} spots filled
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

const EventLists = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await api.get('/public/events');
        setEvents(resp.data?.events || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <div className="container py-12 md:py-16 max-w-6xl p-6 md:p-12">
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#B85C3C] text-white rounded-lg hover:bg-[#A04A2E]"
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No upcoming events at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventLists;