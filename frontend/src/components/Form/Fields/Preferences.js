// Preferences.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../shared/Checkbox';
import SkeletonLoader from './SkeletonLoader';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
  loading = false,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  if (loading) {
    return <SkeletonLoader title="Preferências:" count={4} />;
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Preferências:</h2>
      <ul>
        {preferences.map((preference, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

Preferences.propTypes = {
  preferences: PropTypes.array.isRequired,
  selectedPreferences: PropTypes.array,
  onPreferenceChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Preferences.defaultProps = {
  selectedPreferences: [],
  loading: false,
};

export default Preferences;
