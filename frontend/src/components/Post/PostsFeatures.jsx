import React from 'react';
import PropTypes from 'prop-types';

const PostsFeatures = ({ features }) => {
  return (
    <section className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-3">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div
            key={f.id}
            className="p-3 rounded-lg bg-gray-50/70 dark:bg-slate-900/30 border border-gray-200/60 dark:border-slate-700"
          >
            <div className="font-semibold">{f.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

PostsFeatures.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default PostsFeatures;

