import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsUpdate }) {
  const { preferences, features, products, loading } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [errors, setErrors] = useState({});

  const { getRecommendations } = useRecommendations(products);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.selectedRecommendationType) {
      newErrors.recommendationType =
        'Por favor, selecione um tipo de recomendação';
    }

    const hasPreferences = formData.selectedPreferences.length > 0;
    const hasFeatures = formData.selectedFeatures.length > 0;

    if (!hasPreferences && !hasFeatures) {
      newErrors.selection =
        'Por favor, selecione pelo menos uma Preferência ou Funcionalidade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataRecommendations = getRecommendations(formData);

    if (onRecommendationsUpdate) {
      onRecommendationsUpdate(dataRecommendations);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        loading={loading}
        onPreferenceChange={(selected) => {
          handleChange('selectedPreferences', selected);
          if (errors.selection && selected.length > 0) {
            setErrors({ ...errors, selection: null });
          }
        }}
        error={errors.selection}
      />
      <Features
        features={features}
        loading={loading}
        onFeatureChange={(selected) => {
          handleChange('selectedFeatures', selected);
          if (errors.selection && selected.length > 0) {
            setErrors({ ...errors, selection: null });
          }
        }}
        error={errors.selection}
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) => {
          handleChange('selectedRecommendationType', selected);
          if (errors.recommendationType) {
            setErrors({ ...errors, recommendationType: null });
          }
        }}
        error={errors.recommendationType}
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

Form.propTypes = {
  onRecommendationsUpdate: PropTypes.func,
};

Form.defaultProps = {
  onRecommendationsUpdate: null,
};

export default Form;
