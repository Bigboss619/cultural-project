import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import axios from 'axios';
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react';

const AdminMembership = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const authToken = localStorage.getItem('authToken');
  const API_BASE = '/api/members';

  const fetchMembers = async () => {
    try {
      const resp = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMembers(resp.data.members || []);
    } catch (err) {
      console.error('Failed to fetch members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', role: '', bio: '', image: null });
    setPreviewImage(null);
    setEditingMember(null);
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: null,
      });
      setPreviewImage(member.image_url ? `http://localhost:5000${member.image_url}` : null);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.role.trim() || !formData.bio.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setSaving(true);

    const submitData = new FormData();
    submitData.append('name', formData.name.trim());
    submitData.append('role', formData.role.trim());
    submitData.append('bio', formData.bio.trim());
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      if (editingMember) {
        await axios.put(`${API_BASE}/${editingMember.id}`, submitData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(API_BASE, submitData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      handleCloseModal();
      fetchMembers();
    } catch (err) {
      console.error('Failed to save member:', err);
      alert(err.response?.data?.message || 'Failed to save member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteConfirm) {
      setDeleteConfirm(id);
      return;
    }

    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setDeleteConfirm(null);
      fetchMembers();
    } catch (err) {
      console.error('Failed to delete member:', err);
      alert('Failed to delete member');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage community team members
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Member
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : members.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">No members yet</h3>
            <p className="text-gray-500 mt-1">Click "Add Member" to create your first team member</p>
          </div>
        ) : (
          /* Members Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Member Image */}
                <div className="h-48 bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  {member.image_url ? (
                    <img
                      src={`http://localhost:5000${member.image_url}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-amber-600 font-medium text-sm">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(member)}
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className={`px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm ${
                      deleteConfirm === member.id
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-red-100 dark:bg-red-900 text-red-600 hover:bg-red-200 dark:hover:bg-red-800'
                    }`}
                  >
                    <Trash2 size={14} />
                    {deleteConfirm === member.id ? 'Confirm' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Image Preview */}
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>
                  <label className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Cultural Curator"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Short description about the member..."
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingMember ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMembership;