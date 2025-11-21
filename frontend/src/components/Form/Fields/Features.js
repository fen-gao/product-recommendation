import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../shared/Checkbox';
import SkeletonLoader from './SkeletonLoader';

function Features({
  features,
  selectedFeatures = [],
  onFeatureChange,
  loading = false,
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
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
  selectedFeatures: PropTypes.array,
  onFeatureChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Features.defaultProps = {
  selectedFeatures: [],
  loading: false,
};

export default Features;
