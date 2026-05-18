import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/toast';

import EventsAdminFeatures from '../components/Events/EventsAdminFeatures';
import EventsAdminForm from '../components/Events/EventsAdminForm';
import EventsAdminEventCard from '../components/Events/EventsAdminEventCard';

// Format date for display
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return 'Not set';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Normalize event data from API to match component expectations
const normalizeEvent = (event) => ({
  id: event.id,
  title: event.title,
  category: event.category || 'General',
  dateLabel: 'Date',
  dateValue: event.end_date
    ? `${formatDateDisplay(event.start_date)} - ${formatDateDisplay(event.end_date)}`
    : formatDateDisplay(event.start_date),
  timeLabel: 'Time',
  timeValue: event.start_time && event.end_time
    ? `${event.start_time} - ${event.end_time}`
    : event.start_time || 'Not set',
  locationLabel: 'Location',
  locationValue: event.location || 'Not set',
  ticketLinksLabel: 'Ticket links',
  ticketLinks: event.ticket_links || [],
  rsvp: {
    enabled: event.rsvp_enabled || false,
    seats: event.rsvp_seats || 0,
    accepted: event.rsvp_accepted || 0,
  },
  raw: event,
});

const AdminEvents = () => {
  const { showError, showSuccess } = useToast();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const fetchEvents = useCallback(async () => {
    if (!authToken) {
      setError('Not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await axios.get('/api/events', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setEvents(resp.data?.events || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load events';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  }, [authToken, showError]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      setDeletingId(eventId);
      await axios.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setEvents(prev => prev.filter(e => e.id !== eventId));
      showSuccess('Event deleted successfully');
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to delete event');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowCreateForm(true);
  };

  const handleFormSuccess = (savedEvent, isNew) => {
    if (isNew) {
      setEvents(prev => [savedEvent, ...prev]);
    } else {
      setEvents(prev => prev.map(e => e.id === savedEvent.id ? savedEvent : e));
    }
    setShowCreateForm(false);
    setEditingEvent(null);
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingEvent(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your cultural events</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEvents}
              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add new event
            </button>
          </div>
        </div>

        {/* Features */}
        <EventsAdminFeatures />

        {/* Create/Edit form */}
        {showCreateForm ? (
          <EventsAdminForm
            event={editingEvent}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400">
            Click <span className="font-semibold">Add new event</span> to create an event.
          </div>
        )}

        {/* Events list */}
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Events</h2>
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center">
              <p className="mb-3">{error}</p>
              <button
                onClick={fetchEvents}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 text-center">
              No events found. Create your first event above.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {events.map(event => (
                <div key={event.id} className="relative">
                  <EventsAdminEventCard event={normalizeEvent(event)} />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                    >
                      {deletingId === event.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;