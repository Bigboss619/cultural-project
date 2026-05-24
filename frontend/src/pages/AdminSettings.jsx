import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import api from '../config/axios';
import { Save, Image as ImageIcon, X } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [settings, setSettings] = useState({
    // Hero
    hero_image: null,
    hero_heading: '',
    hero_subheading: '',
    // About
    about_heading: '',
    about_content: '',
    about_image: null,
    // Contact
    contact_location: '',
    contact_email: '',
    contact_phone: '',
    // Social
    social_facebook: '',
    social_twitter: '',
    social_instagram: '',
    social_youtube: '',
  });

  const [previewImages, setPreviewImages] = useState({
    hero_image: null,
    about_image: null,
  });

  const authToken = localStorage.getItem('authToken');

  const fetchSettings = async () => {
    try {
      const resp = await api.get('/api/settings', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = resp.data.settings || {};
      setSettings(prev => ({
        ...prev,
        hero_heading: data.hero_heading || '',
        hero_subheading: data.hero_subheading || '',
        about_heading: data.about_heading || '',
        about_content: data.about_content || '',
        contact_location: data.contact_location || '',
        contact_email: data.contact_email || '',
        contact_phone: data.contact_phone || '',
        social_facebook: data.social_facebook || '',
        social_twitter: data.social_twitter || '',
        social_instagram: data.social_instagram || '',
        social_youtube: data.social_youtube || '',
      }));

      if (data.hero_image) {
        setPreviewImages(prev => ({ ...prev, hero_image: `http://localhost:5000${data.hero_image}` }));
      }
      if (data.about_image) {
        setPreviewImages(prev => ({ ...prev, about_image: `http://localhost:5000${data.about_image}` }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key, file) => {
    if (file) {
      setSettings(prev => ({ ...prev, [key]: file }));
      setPreviewImages(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();

    // Add text fields (skip null and file objects)
    Object.entries(settings).forEach(([key, value]) => {
      if (value !== null && typeof value !== 'object') {
        formData.append(key, value);
      }
    });

    // Add image files only if they are actual File objects
    if (settings.hero_image instanceof File) {
      formData.append('hero_image', settings.hero_image);
    }
    if (settings.about_image instanceof File) {
      formData.append('about_image', settings.about_image);
    }

    try {
      await api.put('/api/settings', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      fetchSettings();
    } catch (err) {
      console.error('Failed to save settings:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'social', label: 'Social Media' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Site Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage homepage content and site information
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-slate-700">
          <nav className="flex gap-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Hero Section</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Hero Background Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-32 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    {previewImages.hero_image ? (
                      <img src={previewImages.hero_image} alt="Hero" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>
                  <label className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange('hero_image', e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={settings.hero_heading}
                  onChange={(e) => handleInputChange('hero_heading', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subheading</label>
                <input
                  type="text"
                  value={settings.hero_subheading}
                  onChange={(e) => handleInputChange('hero_subheading', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero subheading"
                />
              </div>
            </div>
          )}

          {/* About Us */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">About Us Page</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={settings.about_heading}
                  onChange={(e) => handleInputChange('about_heading', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="About heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={settings.about_content}
                  onChange={(e) => handleInputChange('about_content', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="About content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-32 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    {previewImages.about_image ? (
                      <img src={previewImages.about_image} alt="About" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>
                  <label className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange('about_image', e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Contact Information</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={settings.contact_location}
                  onChange={(e) => handleInputChange('contact_location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Office address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="text"
                  value={settings.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Social Media Links</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <input
                  type="url"
                  value={settings.social_facebook}
                  onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Twitter/X</label>
                <input
                  type="url"
                  value={settings.social_twitter}
                  onChange={(e) => handleInputChange('social_twitter', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <input
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => handleInputChange('social_instagram', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <input
                  type="url"
                  value={settings.social_youtube}
                  onChange={(e) => handleInputChange('social_youtube', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;