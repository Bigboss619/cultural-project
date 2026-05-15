export const EVENTS_ADMIN_FEATURES = [
  {
    id: 'features-create',
    title: 'Create events',
    description: 'Add new cultural events with fields for banner, schedule, and location.',
  },
  {
    id: 'features-banners',
    title: 'Event banners',
    description: 'Upload a banner image (mocked) and preview it instantly.',
  },
  {
    id: 'features-datetime',
    title: 'Event date/time',
    description: 'Set the exact event date and time window (mocked inputs).',
  },
  {
    id: 'features-location',
    title: 'Event location',
    description: 'Capture the venue name for attendees (mocked inputs).',
  },
  {
    id: 'features-ticket-links',
    title: 'Ticket links',
    description: 'Add external ticket/registration links or placeholders.',
  },
  {
    id: 'features-rsvp',
    title: 'RSVP system',
    description: 'Enable RSVP and track mock status for each event.',
  },
];

export const EVENTS_ADMIN_EXAMPLES = [
  {
    id: 'new-yam-festival',
    title: 'New Yam Festival',
    bannerAlt: 'New Yam Festival banner',
    category: 'Festival',
    dateLabel: 'Date',
    dateValue: 'August 10-12, 2026',
    timeLabel: 'Time',
    timeValue: '9:00 AM - 7:00 PM',
    locationLabel: 'Location',
    locationValue: 'Oyo Heritage Grounds, Ibadan',
    ticketLinksLabel: 'Ticket links',
    ticketLinks: [
      { label: 'Register', url: 'https://example.com/register/new-yam-festival' },
      { label: 'VIP Pass', url: 'https://example.com/vip/new-yam-festival' },
    ],
    rsvp: { enabled: true, seats: 800, accepted: 612 },
  },
  {
    id: 'cultural-dance-competition',
    title: 'Cultural Dance Competition',
    bannerAlt: 'Cultural Dance Competition banner',
    category: 'Competition',
    dateLabel: 'Date',
    dateValue: 'September 5, 2026',
    timeLabel: 'Time',
    timeValue: '4:00 PM - 9:00 PM',
    locationLabel: 'Location',
    locationValue: 'Legacy Stars Arena Hall',
    ticketLinksLabel: 'Ticket links',
    ticketLinks: [{ label: 'Buy Tickets', url: 'https://example.com/tickets/cultural-dance-competition' }],
    rsvp: { enabled: true, seats: 500, accepted: 349 },
  },
];

export const EVENTS_ADMIN_DEFAULT_FORM = {
  title: '',
  category: 'Festival',
  location: '',
  date: '', // display value only; backend not wired
  timeFrom: '',
  timeTo: '',
  bannerFile: null,
  bannerPreviewUrl: '',
  ticketLinks: [{ label: 'Register', url: '' }],
  rsvpEnabled: true,
  rsvpSeats: 300,
};

