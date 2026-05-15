export const MESSAGES_TABS = {
  MESSAGES: 'messages',
  CONTACT: 'contact',
};

const makeThread = ({
  id,
  tab,
  fromName,
  fromEmail,
  subject,
  body,
  createdAt,
  unread,
  status,
}) => ({
  id,
  tab,
  fromName,
  fromEmail,
  subject,
  body,
  createdAt,
  unread,
  status, // e.g. 'open' | 'resolved'
  replies: [
    {
      id: `${id}-r0`,
      from: fromEmail,
      role: 'user',
      body,
      createdAt,
    },
  ],
});

export const MESSAGES_MOCK_THREADS = [
  makeThread({
    id: 'm-1001',
    tab: MESSAGES_TABS.MESSAGES,
    fromName: 'Aarav Singh',
    fromEmail: 'aarav.singh@example.com',
    subject: 'Donation enquiry',
    body: 'Hello, I would like to know more about how to donate and whether I can receive a receipt.',
    createdAt: '2026-05-10T09:20:00.000Z',
    unread: true,
    status: 'open',
  }),
  makeThread({
    id: 'm-1002',
    tab: MESSAGES_TABS.MESSAGES,
    fromName: 'Mariam Khan',
    fromEmail: 'mariam.khan@example.com',
    subject: 'Membership details',
    body: 'Hi team, can you share the annual membership benefits and the registration link?',
    createdAt: '2026-05-09T15:05:00.000Z',
    unread: false,
    status: 'open',
  }),
  makeThread({
    id: 'm-1003',
    tab: MESSAGES_TABS.MESSAGES,
    fromName: 'Noah Williams',
    fromEmail: 'noah.williams@example.com',
    subject: 'Volunteer opportunities',
    body: 'I am interested in volunteering for upcoming events. What are the available roles?',
    createdAt: '2026-05-08T11:45:00.000Z',
    unread: true,
    status: 'open',
  }),
  makeThread({
    id: 'c-2001',
    tab: MESSAGES_TABS.CONTACT,
    fromName: 'Sofia Rodrigues',
    fromEmail: 'sofia.rodrigues@example.com',
    subject: 'Contact form submission',
    body: 'Hello, I reached out because I want to suggest a cultural heritage topic for your blog.',
    createdAt: '2026-05-11T08:10:00.000Z',
    unread: true,
    status: 'open',
  }),
  makeThread({
    id: 'c-2002',
    tab: MESSAGES_TABS.CONTACT,
    fromName: 'Ethan Chen',
    fromEmail: 'ethan.chen@example.com',
    subject: 'Partnership inquiry',
    body: 'We are exploring partnerships. Could you share who to contact for collaborations?',
    createdAt: '2026-05-07T18:30:00.000Z',
    unread: false,
    status: 'resolved',
  }),
];

export const MESSAGE_STATUS_LABELS = {
  open: { label: 'Open', tone: 'blue' },
  resolved: { label: 'Resolved', tone: 'emerald' },
};

