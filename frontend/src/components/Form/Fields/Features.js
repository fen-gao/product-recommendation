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
    return <SkeletonLoader title="Funcionalidades:" count={4} />;
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Funcionalidades:</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-green-500"
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
