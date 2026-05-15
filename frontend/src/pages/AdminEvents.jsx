import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus } from 'lucide-react';

import EventsAdminFeatures from '../components/Events/EventsAdminFeatures';
import EventsAdminExamples from '../components/Events/EventsAdminExamples';
import EventsAdminForm from '../components/Events/EventsAdminForm';

const AdminEvents = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Main content management</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            New Event
          </button>
        </div>

        {/* Features */}
        <EventsAdminFeatures />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create events */}
          <div className="lg:col-span-2">
            <EventsAdminForm />
          </div>

          {/* Examples */}
          <div>
            <EventsAdminExamples />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;

