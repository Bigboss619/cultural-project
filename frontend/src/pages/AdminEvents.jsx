import React, { useState } from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus } from 'lucide-react';

import EventsAdminFeatures from '../components/Events/EventsAdminFeatures';
import EventsAdminExamples from '../components/Events/EventsAdminExamples';
import EventsAdminForm from '../components/Events/EventsAdminForm';


const AdminEvents = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Main content management</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add new event
          </button>
        </div>

        {/* Features */}
        <EventsAdminFeatures />

        {/* Create events (only when admin clicks the button) */}
        {showCreateForm ? (
          <EventsAdminForm />
        ) : (
          <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400">
            Click <span className="font-semibold">Add new event</span> to create an event.
          </div>
        )}

        {/* Examples: horizontal layout */}
        <div className="overflow-x-auto">
          <EventsAdminExamples horizontal />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;


