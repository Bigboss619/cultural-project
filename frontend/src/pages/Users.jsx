import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Search, UserPlus, Shield } from 'lucide-react';

import ManageHeader from '../components/AdminUsers/ManageHeader';
import ManageTabs from '../components/AdminUsers/ManageTabs';
import UsersTable from '../components/AdminUsers/UsersTable';
import UserActionsPanel from '../components/AdminUsers/UserActionsPanel';

import { mockRoleGroups, mockFeatures } from '../components/AdminUsers/mockUserData';

const roleToTab = (role) => {
  if (role === 'Admin') return 'Admins';
  if (role === 'Editor') return 'Editors';
  if (role === 'Member') return 'Members';
  return 'Guests';
};

const tabToRole = (tab) => {
  if (tab === 'Admins') return 'Admin';
  if (tab === 'Editors') return 'Editor';
  if (tab === 'Members') return 'Member';
  return 'Guest';
};

const Users = () => {
  const [activeTab, setActiveTab] = React.useState('Admins');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Local mock state
  const [roleGroups, setRoleGroups] = React.useState(() => structuredClone(mockRoleGroups));
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const allUsers = React.useMemo(() => {
    return Object.values(roleGroups).flat();
  }, [roleGroups]);

  const filteredUsersForTab = React.useMemo(() => {
    if (activeTab === 'Features') return [];
    const base = roleGroups[activeTab] || [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
      );
    });
  }, [activeTab, roleGroups, searchQuery]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    showToast(`Mock: Editing ${user.name}`);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    // Mock delete: remove from roleGroups
    setRoleGroups((prev) => {
      const next = structuredClone(prev);
      const tab = roleToTab(user.role);
      next[tab] = (next[tab] || []).filter((u) => u.id !== user.id);
      return next;
    });
    showToast(`Mock: Deleted ${user.name}`);
  };

  const handleSuspend = (user) => {
    setSelectedUser(user);
    setRoleGroups((prev) => {
      const next = structuredClone(prev);
      const tab = roleToTab(user.role);
      next[tab] = (next[tab] || []).map((u) =>
        u.id === user.id ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u
      );
      return next;
    });
    showToast(`Mock: Toggled suspension for ${user.name}`);
  };

  const handleAssignRoles = (user) => {
    setSelectedUser(user);
    // Mock assign roles: cycle role tab
    setRoleGroups((prev) => {
      const next = structuredClone(prev);
      const order = ['Admins', 'Editors', 'Members', 'Guests'];
      const currentTab = roleToTab(user.role);
      const idx = order.indexOf(currentTab);
      const newTab = order[(idx + 1) % order.length];

      // Remove from old tab
      next[currentTab] = (next[currentTab] || []).filter((u) => u.id !== user.id);
      // Add to new tab
      const updatedUser = { ...user, role: tabToRole(newTab), status: user.status };
      next[newTab] = [...(next[newTab] || []), updatedUser];
      return next;
    });
    showToast(`Mock: Assigned new role for ${user.name}`);
  };

  const handleAdd = () => {
    // Mock add: add to active tab (role)
    const newId = `u-${Math.floor(Math.random() * 9000) + 1000}`;
    const tab = activeTab === 'Features' ? 'Members' : activeTab;
    const role = tabToRole(tab);

    const newUser = {
      id: newId,
      name: 'New User',
      email: `new${newId}@example.com`,
      role,
      status: 'Active',
    };

    setRoleGroups((prev) => {
      const next = structuredClone(prev);
      next[tab] = [...(next[tab] || []), newUser];
      return next;
    });

    showToast(`Mock: Added ${newUser.name}`);
  };

  // Actions panel uses selectedUser
  const selectedUserExists = Boolean(selectedUser);

  const handleEditSelected = () => {
    if (!selectedUser) return;
    handleEdit(selectedUser);
  };

  const handleDeleteSelected = () => {
    if (!selectedUser) return;
    handleDelete(selectedUser);
    setSelectedUser(null);
  };

  const handleSuspendSelected = () => {
    if (!selectedUser) return;
    handleSuspend(selectedUser);
  };

  const handleAssignRolesSelected = () => {
    if (!selectedUser) return;
    handleAssignRoles(selectedUser);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ManageHeader />

        {/* Search */}
        {activeTab !== 'Features' && (
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <ManageTabs activeTab={activeTab} onChange={setActiveTab} />

        {toast && (
          <div className="fixed top-4 right-4 z-50">
            <div className="px-4 py-3 rounded-lg bg-slate-900 text-white shadow-lg text-sm">{toast}</div>
          </div>
        )}

        {activeTab === 'Features' ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Shield size={18} /> Features
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Mock feature list for user administration.
                </p>
              </div>

              <div className="space-y-3">
                {mockFeatures.map((f) => (
                  <div
                    key={f.id}
                    className="p-5 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{f.label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.description}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
                          f.status === 'Enabled'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {f.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-blue-50 dark:bg-slate-900/50 border border-blue-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-700 dark:text-blue-300" />
                  <h3 className="font-bold">Try the actions</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Switch back to Admins/Editors/Members/Guests to manage mock users.
                </p>
              </div>
              <div className="opacity-70">
                <UserActionsPanel
                  onAdd={handleAdd}
                  onEdit={handleEditSelected}
                  onDelete={handleDeleteSelected}
                  onSuspend={handleSuspendSelected}
                  onAssignRoles={handleAssignRolesSelected}
                  disabled={!selectedUserExists}
                />
              </div>
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{activeTab}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {filteredUsersForTab.length} user(s) in this group.
                  </p>
                </div>
              </div>

              <UsersTable
                users={filteredUsersForTab}
                onEdit={(u) => {
                  setSelectedUser(u);
                  handleEdit(u);
                }}
                onDelete={(u) => {
                  setSelectedUser(u);
                  handleDelete(u);
                  setSelectedUser(null);
                }}
                onSuspend={(u) => {
                  setSelectedUser(u);
                  handleSuspend(u);
                }}
                onAssignRoles={(u) => {
                  setSelectedUser(u);
                  handleAssignRoles(u);
                }}
              />

              <div className="text-xs text-gray-600 dark:text-gray-400">
                Showing {filteredUsersForTab.length} of {roleGroups[activeTab]?.length || 0} user(s).
              </div>
            </div>

            <div className="space-y-4">
              <UserActionsPanel
                onAdd={handleAdd}
                onEdit={handleEditSelected}
                onDelete={handleDeleteSelected}
                onSuspend={handleSuspendSelected}
                onAssignRoles={handleAssignRolesSelected}
                disabled={!selectedUserExists}
              />

              <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold mb-2">Quick Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {['Admins', 'Editors', 'Members', 'Guests'].map((tab) => (
                    <div key={tab} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700">
                      <div className="font-semibold">{tab}</div>
                      <div className="text-gray-600 dark:text-gray-400">{roleGroups[tab]?.length || 0} users</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                  Total: {allUsers.length}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;

