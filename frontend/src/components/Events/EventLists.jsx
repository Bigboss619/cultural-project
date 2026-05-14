import React from 'react'

const EVENTS_MOCK = [
  {
    id: 'heritage-festival-2025',
    category: 'Festival',
    title: 'Heritage Festival 2025',
    dateLabel: 'Date',
    dateValue: 'June 15-17, 2025',
    timeLabel: 'Time',
    timeValue: '10:00 AM - 8:00 PM',
    locationLabel: 'Location',
    locationValue: 'Ibadan Cultural Center',
    ctaLabel: 'Register Now',
  },
  {
    id: 'youth-mentorship-2025',
    category: 'Program',
    title: 'Youth Mentorship Program Launch',
    dateLabel: 'Date',
    dateValue: 'February 1, 2025',
    timeLabel: 'Time',
    timeValue: '2:00 PM - 5:00 PM',
    locationLabel: 'Location',
    locationValue: 'Legacy Stars Community Hall',
    ctaLabel: 'Register Now',
  },
  {
    id: 'yoruba-language-workshop-2025',
    category: 'Workshop',
    title: 'Yoruba Language Workshop',
    dateLabel: 'Date',
    dateValue: 'February 8, 2025',
    timeLabel: 'Time',
    timeValue: '3:00 PM - 5:00 PM',
    locationLabel: 'Location',
    locationValue: 'Community Learning Center',
    ctaLabel: 'Register Now',
  },
  {
    id: 'traditional-crafts-exhibition-2025',
    category: 'Exhibition',
    title: 'Traditional Crafts Exhibition',
    dateLabel: 'Date',
    dateValue: 'February 22, 2025',
    timeLabel: 'Time',
    timeValue: '10:00 AM - 6:00 PM',
    locationLabel: 'Location',
    locationValue: 'Ibadan Arts Gallery',
    ctaLabel: 'Register Now',
  },
]

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
  )
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
  )
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
  )
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
  )
}

function EventCard({ event }) {
  return (
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-l-4 border-[#B85C3C]">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-[#F0EBE3] text-[#B85C3C] text-xs font-semibold rounded mb-3">
                {event.category}
              </span>
              <h3 className="text-2xl font-display font-bold text-[#1A1A1A]">{event.title}</h3>
            </div>

            <button className="px-6 py-2 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300 whitespace-nowrap">
              {event.ctaLabel}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-gray-600">
            <EventMetaRow
              icon={<CalendarIcon />}
              label={event.dateLabel}
              value={event.dateValue}
            />
            <EventMetaRow icon={<ClockIcon />} label={event.timeLabel} value={event.timeValue} />
            <EventMetaRow
              icon={<MapPinIcon />}
              label={event.locationLabel}
              value={event.locationValue}
            />
          </div>
        </div>
      </article>
  )
}

const EventLists = () => {
  return (
    <section>
      <div className="container py-12 md:py-16 max-w-6xl p-6 md:p-12">
        <div className="space-y-8">
          {EVENTS_MOCK.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventLists

