import React from 'react';
import { Pencil, Trash2, Upload } from 'lucide-react';


const statusBadge = (status) => {
  if (status === 'published') {
    return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200 border border-green-100 dark:border-green-900/40';
  }
  return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200 border border-yellow-100 dark:border-yellow-900/40';
};

const PostsList = ({
  posts,
  filter,
  onEdit,
  onDelete,
  onPublish,
}) => {
  return (
    <section className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xl font-bold">{filter === 'published' ? 'Published articles' : filter === 'draft' ? 'Drafts' : 'All articles'}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your content lifecycle.</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {posts.length} item{posts.length === 1 ? '' : 's'}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-10">No posts found.</div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="p-4 rounded-lg border border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(p.status)}`}>{p.status}</span>
                    {p.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40">
                        Featured
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-700 dark:bg-slate-900/30 dark:text-slate-200 border border-gray-200 dark:border-slate-700">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mt-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{p.summary}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Updated: {new Date(p.updatedAt).toLocaleString()}</div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {p.status === 'draft' && (
                    <button
                      onClick={() => onPublish(p)}
                      className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-900/40 text-sm flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(p)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label={`Edit ${p.title}`}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(p)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label={`Delete ${p.title}`}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostsList;


