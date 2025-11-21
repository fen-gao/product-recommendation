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
  error,
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
    return (
      <SkeletonLoader
        title="Preferências:"
        count={4}
        icon="💡"
        bgColor="bg-blue-50"
      />
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">💡</span>
        <h3 className="text-lg font-semibold text-gray-800">Preferências</h3>
      </div>
      <div className="space-y-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
        {preferences.map((preference, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
            >
              {preference}
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

Preferences.propTypes = {
  preferences: PropTypes.array.isRequired,
  selectedPreferences: PropTypes.array,
  onPreferenceChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

Preferences.defaultProps = {
  selectedPreferences: [],
  loading: false,
  error: null,
};

export default Preferences;
