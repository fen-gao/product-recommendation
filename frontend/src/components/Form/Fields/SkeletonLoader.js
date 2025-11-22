import React from 'react';
import PropTypes from 'prop-types';

function SkeletonLoader({
  title,
  count = 4,
  icon = '⏳',
  bgColor = 'bg-gray-50',
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{icon}</span>
        <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
      </div>

      <div
        className={`space-y-2 ${bgColor} p-4 rounded-lg border border-gray-200`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white p-2 rounded-md animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div
                className="h-4 bg-gray-300 rounded"
                style={{
                  width: `${Math.floor(Math.random() * 40) + 60}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SkeletonLoader.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.string,
  bgColor: PropTypes.string,
};

SkeletonLoader.defaultProps = {
  title: '',
  count: 4,
  icon: '⏳',
  bgColor: 'bg-gray-50',
};

export default SkeletonLoader;
