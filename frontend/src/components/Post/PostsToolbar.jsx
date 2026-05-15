import React from 'react';
import PropTypes from 'prop-types';
import { Plus, Search } from 'lucide-react';

const PostsToolbar = ({ searchQuery, onSearchQueryChange, onCreateClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onCreateClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
      >
        <Plus size={20} />
        New Article
      </button>
    </div>
  );
};

PostsToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};

export default PostsToolbar;

