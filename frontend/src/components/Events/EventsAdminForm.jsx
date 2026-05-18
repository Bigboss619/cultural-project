import React, { useMemo, useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../toast/ToastProvider';

const CATEGORIES = ['Festival', 'Competition', 'Workshop', 'Exhibition', 'Program', 'General'];

const DEFAULT_FORM = {
  title: '',
  category: 'Festival',
  location: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  description: '',
  banner_image: null,
  status: 'draft',
  rsvp_enabled: true,
  rsvp_seats: 300,
  ticket_links: [{ label: 'Register', url: '' }],
};

export default function EventsAdminForm({ event, onSuccess, onCancel }) {
  const { showError, showSuccess } = useToast();

  const isEdit = Boolean(event);

  const getInitialForm = () => {
    if (!event) return { ...DEFAULT_FORM };

    return {
      title: event.title || '',
      category: event.category || 'Festival',
      location: event.location || '',
      start_date: event.start_date || '',
      end_date: event.end_date || '',
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      description: event.description || '',
      banner_image: event.banner_image || null,
      status: event.status || 'draft',
      rsvp_enabled: event.rsvp_enabled || false,
      rsvp_seats: event.rsvp_seats || 300,
      ticket_links: event.ticket_links?.length ? event.ticket_links : [{ label: 'Register', url: '' }],
    };
  };

  const [form, setForm] = useState(getInitialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setForm(getInitialForm());
    setFormError('');
  }, [event]);

  const authToken = localStorage.getItem('authToken');

  const timeValue = useMemo(() => {
    if (!form.start_time && !form.end_time) return '';
    if (form.start_time && form.end_time) return `${form.start_time} - ${form.end_time}`;
    return form.start_time || form.end_time;
  }, [form.start_time, form.end_time]);

  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  function updateTicketLink(idx, patch) {
    setForm((prev) => {
      const next = [...prev.ticket_links];
      next[idx] = { ...next[idx], ...patch };
      return { ...prev, ticket_links: next };
    });
  }

  function addTicketLink() {
    setForm((prev) => ({
      ...prev,
      ticket_links: [...prev.ticket_links, { label: 'Ticket', url: '' }],
    }));
  }

  function removeTicketLink(idx) {
    if (form.ticket_links.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      ticket_links: prev.ticket_links.filter((_, i) => i !== idx),
    }));
  }

  function handleBannerChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, bannerFile: file, bannerPreviewUrl: previewUrl }));
  }

  function resetForm() {
    setForm({ ...DEFAULT_FORM });
    setFormError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = form.title.trim();
    const location = form.location.trim();
    const start_date = form.start_date.trim();

    if (!title || !location || !start_date) {
      setFormError('Please fill Title, Date, and Location.');
      return;
    }

    for (const t of form.ticket_links) {
      if (t.url && !isValidUrl(t.url)) {
        setFormError('Please enter valid URLs for ticket links.');
        return;
      }
    }

    setSubmitting(true);
    setFormError('');

    try {
      const payload = {
        title,
        location,
        start_date,
        end_date: form.end_date || null,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        description: form.description || '',
        category: form.category,
        banner_image: form.banner_image,
        status: form.status,
        rsvp_enabled: form.rsvp_enabled,
        rsvp_seats: form.rsvp_seats,
        ticket_links: form.ticket_links.filter(t => t.label || t.url),
      };

      let savedEvent;
      let isNew = true;

      if (isEdit) {
        await axios.put(`/api/events/${event.id}`, payload, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        savedEvent = { ...event, ...payload };
        isNew = false;
        showSuccess('Event updated successfully');
      } else {
        const resp = await axios.post('/api/events', payload, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        savedEvent = { ...payload, id: resp.data.eventId };
        showSuccess('Event created successfully');
      }

      onSuccess(savedEvent, isNew);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save event';
      setFormError(msg);
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-2">Event banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="block w-full text-sm text-gray-700 dark:text-gray-200"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {isEdit ? 'Upload a new image to replace the current banner.' : 'Select an image file.'}
            </div>
          </div>
          <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-3 flex items-center justify-center bg-gray-50/50 dark:bg-slate-900/30">
            {form.bannerPreviewUrl ? (
              <img
                src={form.bannerPreviewUrl}
                alt="Event banner preview"
                className="w-full h-32 object-cover rounded"
              />
            ) : form.banner_image ? (
              <img
                src={form.banner_image}
                alt="Current banner"
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">No banner</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Choose an image</div>
              </div>
            )}
          </div>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. New Yam Festival"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start date *</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End date</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => setForm((prev) => ({ ...prev, end_date: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start time</label>
            <input
              type="time"
              value={form.start_time}
              onChange={(e) => setForm((prev) => ({ ...prev, start_time: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End time</label>
            <input
              type="time"
              value={form.end_time}
              onChange={(e) => setForm((prev) => ({ ...prev, end_time: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Oyo Heritage Grounds, Ibadan"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the event..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Ticket links */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="block text-sm font-medium">Ticket links</label>
            <button
              type="button"
              onClick={addTicketLink}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add link
            </button>
          </div>

          <div className="space-y-3">
            {form.ticket_links.map((t, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-2 md:items-start">
                <input
                  value={t.label}
                  onChange={(e) => updateTicketLink(idx, { label: e.target.value })}
                  className="md:w-40 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Label"
                />
                <input
                  value={t.url}
                  onChange={(e) => updateTicketLink(idx, { url: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() => removeTicketLink(idx)}
                  className="p-2 mt-1 md:mt-0 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30"
                  disabled={form.ticket_links.length <= 1}
                  aria-label="Remove ticket link"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">RSVP system</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Allow attendees to RSVP and track capacity.
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.rsvp_enabled}
                onChange={(e) => setForm((prev) => ({ ...prev, rsvp_enabled: e.target.checked }))}
                className="w-4 h-4"
              />
              <span className="text-sm">Enabled</span>
            </label>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium">RSVP seats</label>
            <input
              type="number"
              min={1}
              value={form.rsvp_seats}
              onChange={(e) => setForm((prev) => ({ ...prev, rsvp_seats: Number(e.target.value) }))}
              disabled={!form.rsvp_enabled}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {formError ? (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
            {formError}
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}