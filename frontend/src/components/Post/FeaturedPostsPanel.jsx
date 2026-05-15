import React from 'react';
import PropTypes from 'prop-types';

const FeaturedPostsPanel = ({ posts, onEdit }) => {
  return (
    <section className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xl font-bold">Featured posts</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pinned items shown more prominently.</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-6">No featured posts.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((p) => (
            <div key={p.id} className="p-4 rounded-lg border border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40">
                      Featured
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-700 dark:bg-slate-900/30 dark:text-slate-200 border border-gray-200 dark:border-slate-700">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mt-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{p.summary}</p>
                </div>

                <button
                  onClick={() => onEdit(p)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

FeaturedPostsPanel.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      summary: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default FeaturedPostsPanel;

