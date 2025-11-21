import React from 'react';

function SkeletonLoader({ title, count = 4 }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <ul>
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} className="mb-2">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-full max-w-xs"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonLoader;
