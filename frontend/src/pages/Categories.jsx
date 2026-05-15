import React from 'react';
import AdminLayout from '../components/DashboardLayout/AdminLayout';
import { Plus, Search, MoreVertical } from 'lucide-react';

const Categories = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categories] = React.useState([
    { id: 1, name: 'Technology', description: 'Tech related posts', posts: 45 },
    { id: 2, name: 'Culture', description: 'Cultural heritage posts', posts: 32 },
    { id: 3, name: 'Events', description: 'Event announcements', posts: 28 },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage content categories</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Add Category
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cat.posts} posts</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
