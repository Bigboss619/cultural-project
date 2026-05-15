export const mockRoleGroups = {
  Admins: [
    {
      id: 'u-1001',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 'u-1002',
      name: 'Amina Rahman',
      email: 'amina@example.com',
      role: 'Admin',
      status: 'Active',
    },
  ],
  Editors: [
    {
      id: 'u-2001',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'Active',
    },
    {
      id: 'u-2002',
      name: 'Carlos Gomez',
      email: 'carlos@example.com',
      role: 'Editor',
      status: 'Inactive',
    },
  ],
  Members: [
    {
      id: 'u-3001',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Member',
      status: 'Active',
    },
    {
      id: 'u-3002',
      name: 'Priya Nair',
      email: 'priya@example.com',
      role: 'Member',
      status: 'Active',
    },
    {
      id: 'u-3003',
      name: 'Omar El-Sayed',
      email: 'omar@example.com',
      role: 'Member',
      status: 'Inactive',
    },
  ],
  Guests: [
    {
      id: 'u-4001',
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'Guest',
      status: 'Active',
    },
  ],
};

export const mockFeatures = [
  {
    id: 'f-1',
    label: 'User Directory',
    description: 'Browse and search users by role and status.',
    status: 'Enabled',
  },
  {
    id: 'f-2',
    label: 'Role Assignment',
    description: 'Assign roles to users with a single action.',
    status: 'Enabled',
  },
  {
    id: 'f-3',
    label: 'Account Suspension',
    description: 'Suspend active accounts for moderation/safety.',
    status: 'Enabled',
  },
  {
    id: 'f-4',
    label: 'Audit Log (Mock)',
    description: 'Track admin actions locally (mock).',
    status: 'Coming soon',
  },
];

