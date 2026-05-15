import React, { useMemo, useState } from 'react';
import { EVENTS_ADMIN_DEFAULT_FORM } from './eventsAdminMockData';
import { Plus, Trash2 } from 'lucide-react';

export default function EventsAdminForm() {
  const [form, setForm] = useState(EVENTS_ADMIN_DEFAULT_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const timeValue = useMemo(() => {
    if (!form.timeFrom && !form.timeTo) return '';
    if (form.timeFrom && form.timeTo) return `${form.timeFrom} - ${form.timeTo}`;
    return form.timeFrom || form.timeTo;
  }, [form.timeFrom, form.timeTo]);

  function updateTicketLink(idx, patch) {
    setForm((prev) => {
      const next = [...prev.ticketLinks];
      next[idx] = { ...next[idx], ...patch };
      return { ...prev, ticketLinks: next };
    });
  }

  function addTicketLink() {
    setForm((prev) => ({
      ...prev,
      ticketLinks: [...prev.ticketLinks, { label: 'Ticket', url: '' }],
    }));
  }

  function removeTicketLink(idx) {
    setForm((prev) => ({
      ...prev,
      ticketLinks: prev.ticketLinks.filter((_, i) => i !== idx),
    }));
  }

  function handleBannerChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, bannerFile: file, bannerPreviewUrl: previewUrl }));
  }

  function resetForm() {
    setForm(EVENTS_ADMIN_DEFAULT_FORM);
    setStatus({ type: 'idle', message: '' });
  }

  function submitMock(e) {
    e.preventDefault();

    const title = form.title.trim();
    const location = form.location.trim();
    const date = form.date.trim();

    if (!title || !location || !date) {
      setStatus({ type: 'error', message: 'Please fill Title, Date, and Location.' });
      return;
    }

    setStatus({
      type: 'success',
      message: 'Event created (mock). Connect to backend to persist changes.',
    });
  }

  return (
    <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-3">Create events</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
        Mock form (local state only). Includes banner, date/time, location, ticket links, and RSVP.
      </p>

      <form onSubmit={submitMock} className="space-y-5">
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
              Preview updates instantly (mock).
            </div>
          </div>
          <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-3 flex items-center justify-center bg-gray-50/50 dark:bg-slate-900/30">
            {form.bannerPreviewUrl ? (
              <img
                src={form.bannerPreviewUrl}
                alt="Event banner preview"
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">No banner selected</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Choose an image file</div>
              </div>
            )}
          </div>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. New Yam Festival"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['Festival', 'Competition', 'Workshop', 'Exhibition', 'Program'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. August 10-12, 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time (from/to)</label>
            <div className="flex gap-2">
              <input
              type="time"
                value={form.timeFrom}
                onChange={(e) => setForm((prev) => ({ ...prev, timeFrom: e.target.value }))}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 9:00 AM"
              />
              <input
              type="time"
                value={form.timeTo}
                onChange={(e) => setForm((prev) => ({ ...prev, timeTo: e.target.value }))}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 7:00 PM"
              />
            </div>
            {timeValue ? (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Preview: {timeValue}</div>
            ) : null}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Event location</label>
            <input
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Oyo Heritage Grounds, Ibadan"
            />
          </div>
        </div>

        {/* Ticket links */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="block text-sm font-medium">Ticket links</label>
            <button
              type="button"
              onClick={addTicketLink}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add link
            </button>
          </div>

          <div className="space-y-3">
            {form.ticketLinks.map((t, idx) => (
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
                  className="p-2 mt-1 md:mt-0 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
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
                Toggle RSVP and set a mock seat limit.
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.rsvpEnabled}
                onChange={(e) => setForm((prev) => ({ ...prev, rsvpEnabled: e.target.checked }))}
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
              value={form.rsvpSeats}
              onChange={(e) => setForm((prev) => ({ ...prev, rsvpSeats: Number(e.target.value) }))}
              disabled={!form.rsvpEnabled}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {status.type !== 'idle' ? (
          <div
            className={
              status.type === 'success'
                ? 'p-3 rounded-lg bg-green-50 border border-green-200 text-green-800'
                : 'p-3 rounded-lg bg-red-50 border border-red-200 text-red-800'
            }
          >
            {status.message}
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create event (mock)
          </button>
        </div>
      </form>
    </div>
  );
}

