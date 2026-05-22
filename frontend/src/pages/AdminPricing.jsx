import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import api from '../config/axios';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminPricing = () => {
  const [pricing, setPricing] = useState({
    community: {
      name: 'Community Member',
      description: 'Join our community and stay connected',
      price: 'Free',
      amount: 0,
      buttonText: 'Join Now',
      features: ['Access to community events', 'Monthly newsletter', 'Community forum access', 'Event discounts']
    },
    active: {
      name: 'Active Member',
      description: 'Full participation in all programs',
      price: '₦5,000/year',
      amount: 5000,
      buttonText: 'Join Now',
      features: ['All Community Member benefits', 'Voting rights', 'Exclusive workshops', 'Member spotlight features', 'Priority event registration']
    },
    patron: {
      name: 'Patron Member',
      description: 'Support our cultural mission',
      price: '₦25,000/year',
      amount: 25000,
      buttonText: 'Become a Patron',
      features: ['All Active Member benefits', 'Recognition in annual report', 'Exclusive patron events', 'Mentorship opportunities', 'Cultural project involvement']
    }
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const authToken = localStorage.getItem('authToken');

  // Load pricing from settings
  const fetchPricing = async () => {
    try {
      const resp = await api.get('/settings', { headers: { Authorization: `Bearer ${authToken}` } });
      const settings = resp.data.settings || {};

      // Load saved pricing if exists
      if (settings.pricing_community) {
        const saved = JSON.parse(settings.pricing_community);
        setPricing(prev => ({ ...prev, community: { ...prev.community, ...saved } }));
      }
      if (settings.pricing_active) {
        const saved = JSON.parse(settings.pricing_active);
        setPricing(prev => ({ ...prev, active: { ...prev.active, ...saved } }));
      }
      if (settings.pricing_patron) {
        const saved = JSON.parse(settings.pricing_patron);
        setPricing(prev => ({ ...prev, patron: { ...prev.patron, ...saved } }));
      }
    } catch (err) {
      console.error('Failed to fetch pricing:', err);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleTierChange = (tier, field, value) => {
    setPricing(prev => ({
      ...prev,
      [tier]: { ...prev[tier], [field]: value }
    }));
  };

  const handleFeatureChange = (tier, index, value) => {
    setPricing(prev => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        features: prev[tier].features.map((f, i) => (i === index ? value : f))
      }
    }));
  };

  const addFeature = (tier) => {
    setPricing(prev => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        features: [...prev[tier].features, 'New feature']
      }
    }));
  };

  const removeFeature = (tier, index) => {
    setPricing(prev => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        features: prev[tier].features.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('pricing_community', JSON.stringify(pricing.community));
      formData.append('pricing_active', JSON.stringify(pricing.active));
      formData.append('pricing_patron', JSON.stringify(pricing.patron));

      await api.put('/settings', formData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      setMessage({ type: 'success', text: 'Pricing saved successfully!' });
    } catch (err) {
      console.error('Failed to save pricing:', err);
      setMessage({ type: 'error', text: 'Failed to save pricing' });
    } finally {
      setSaving(false);
    }
  };

  const tiers = [
    { key: 'community', label: 'Community Member', color: 'blue' },
    { key: 'active', label: 'Active Member', color: 'amber' },
    { key: 'patron', label: 'Patron Member', color: 'green' }
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50 border-blue-200', header: 'bg-blue-600', text: 'text-blue-700' },
    amber: { bg: 'bg-amber-50 border-amber-200', header: 'bg-amber-600', text: 'text-amber-700' },
    green: { bg: 'bg-green-50 border-green-200', header: 'bg-green-600', text: 'text-green-700' }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pricing Management</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message.text && (
          <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const data = pricing[tier.key];
            const colors = colorMap[tier.color];

            return (
              <div key={tier.key} className={`rounded-lg border ${colors.bg}`}>
                <div className={`${colors.header} text-white p-4 rounded-t-lg`}>
                  <h3 className="font-bold">{tier.label}</h3>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => handleTierChange(tier.key, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={data.description}
                      onChange={(e) => handleTierChange(tier.key, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Price Label</label>
                    <input
                      type="text"
                      value={data.price}
                      onChange={(e) => handleTierChange(tier.key, 'price', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                      placeholder="e.g. ₦5,000/year"
                    />
                  </div>

                  {tier.key !== 'community' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount (₦)</label>
                      <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => handleTierChange(tier.key, 'amount', Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg bg-white"
                        min="0"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Button Text</label>
                    <input
                      type="text"
                      value={data.buttonText}
                      onChange={(e) => handleTierChange(tier.key, 'buttonText', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Features</label>
                    <div className="space-y-2">
                      {data.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(tier.key, idx, e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg bg-white text-sm"
                          />
                          <button
                            onClick={() => removeFeature(tier.key, idx)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addFeature(tier.key)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus size={16} /> Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;