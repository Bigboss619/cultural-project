export const INITIAL_FEATURES = [
  { id: 1, title: 'Draft workflow', description: 'Create drafts, review, then publish when ready.' },
  { id: 2, title: 'Featured pinning', description: 'Highlight important posts on the frontend.' },
  { id: 3, title: 'Quick editing', description: 'Edit content without leaving the admin dashboard.' },
  { id: 4, title: 'Clean categories', description: 'Keep content structured using simple tags.' },
];

export const INITIAL_POSTS = [
  {
    id: 1,
    title: 'History of Igbo Culture',
    status: 'published',
    featured: true,
    category: 'History',
    summary:
      'A brief overview of the origins, values, and major historical milestones that shaped Igbo identity.',
    content:
      'Igbo culture has deep roots spanning centuries of migrations, kingdoms, and interactions across West Africa. This post outlines key eras and cultural influences that contributed to today\'s Igbo society.',
    updatedAt: new Date('2026-03-10T10:30:00Z').toISOString(),
  },
  {
    id: 2,
    title: 'Cultural Festivals in Nigeria',
    status: 'published',
    featured: true,
    category: 'Festivals',
    summary:
      'Discover major festivals celebrated across Nigeria and what each community holds sacred.',
    content:
      'From elaborate masquerade traditions to seasonal harvest celebrations, Nigerian festivals reflect history, belief systems, and community unity. Explore festival types, common rituals, and their cultural significance.',
    updatedAt: new Date('2026-03-18T14:00:00Z').toISOString(),
  },
  {
    id: 3,
    title: 'Traditional Marriage Rites',
    status: 'draft',
    featured: false,
    category: 'Religion',
    summary:
      'A draft outlining common stages, roles, and symbolic meanings within traditional marriage ceremonies.',
    content:
      'This draft covers the typical structure of marriage rites including negotiations, ceremonies, and communal blessings. It is intended for review before publishing.',
    updatedAt: new Date('2026-04-05T09:15:00Z').toISOString(),
  },
];

