import React, { useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Edit2, Trash2, Lock, Shield } from 'lucide-react';
import UserHeader from '../components/AdminUsers/UserHeader';
import UserSearchBar from '../components/AdminUsers/UserSearchBar';
import UserTable from '../components/AdminUsers/UserTable';
import EditUserModal from '../components/AdminUsers/EditUserModal';
import DeleteUserModal from '../components/AdminUsers/DeleteUserModal';
import SuspendAccountModal from '../components/AdminUsers/SuspendAccountModal';
import AssignRolesModal from '../components/AdminUsers/AssignRolesModal';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' },
  ]);

  // Modal states
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
  const [suspendModal, setSuspendModal] = useState({ isOpen: false, user: null });
  const [rolesModal, setRolesModal] = useState({ isOpen: false, user: null });

  // Action handlers
  const handleEditUser = (user) => {
    setEditModal({ isOpen: true, user });
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditModal({ isOpen: false, user: null });
  };

  const handleDeleteUser = (user) => {
    setDeleteModal({ isOpen: true, user });
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== deleteModal.user.id));
    setDeleteModal({ isOpen: false, user: null });
  };

  const handleSuspendAccount = (user) => {
    setSuspendModal({ isOpen: true, user });
  };

  const handleConfirmSuspend = (reason) => {
    setUsers(users.map(u => 
      u.id === suspendModal.user.id 
        ? { ...u, status: 'Suspended', suspendReason: reason }
        : u
    ));
    setSuspendModal({ isOpen: false, user: null });
  };

  const handleAssignRoles = (user) => {
    setRolesModal({ isOpen: true, user });
  };

  const handleSaveRoles = (userId, newRoles) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: newRoles }
        : u
    ));
    setRolesModal({ isOpen: false, user: null });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const actions = [
    { icon: Edit2, label: 'Edit', handler: handleEditUser, color: 'blue' },
    { icon: Shield, label: 'Assign Roles', handler: handleAssignRoles, color: 'purple' },
    { icon: Lock, label: 'Suspend', handler: handleSuspendAccount, color: 'yellow' },
    { icon: Trash2, label: 'Delete', handler: handleDeleteUser, color: 'red' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <UserHeader />
        <UserSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <UserTable 
          users={filteredUsers} 
          actions={actions}
        />

        {/* Modals */}
        <EditUserModal
          isOpen={editModal.isOpen}
          user={editModal.user}
          onClose={() => setEditModal({ isOpen: false, user: null })}
          onSave={handleSaveEdit}
        />

        <DeleteUserModal
          isOpen={deleteModal.isOpen}
          user={deleteModal.user}
          onClose={() => setDeleteModal({ isOpen: false, user: null })}
          onConfirm={handleConfirmDelete}
        />

        <SuspendAccountModal
          isOpen={suspendModal.isOpen}
          user={suspendModal.user}
          onClose={() => setSuspendModal({ isOpen: false, user: null })}
          onConfirm={handleConfirmSuspend}
        />

        <AssignRolesModal
          isOpen={rolesModal.isOpen}
          user={rolesModal.user}
          onClose={() => setRolesModal({ isOpen: false, user: null })}
          onSave={handleSaveRoles}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
