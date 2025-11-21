import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../shared/Checkbox';
import SkeletonLoader from './SkeletonLoader';

function Features({
  features,
  selectedFeatures = [],
  onFeatureChange,
  loading = false,
  error,
}) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  if (loading) {
    return (
      <SkeletonLoader
        title="Funcionalidades:"
        count={4}
        icon="⚙️"
        bgColor="bg-green-50"
      />
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">⚙️</span>
        <h3 className="text-lg font-semibold text-gray-800">Funcionalidades</h3>
      </div>
      <div className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-100">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-md hover:bg-green-50 transition-colors"
          >
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
            >
              {feature}
            </Checkbox>
          </div>
        ))}
      </div>
      {error && (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <span className="mr-1">⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
  selectedFeatures: PropTypes.array,
  onFeatureChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

Features.defaultProps = {
  selectedFeatures: [],
  loading: false,
  error: null,
};

export default Features;
