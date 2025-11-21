// useRecommendations.js

import { useState } from 'react';
import { getRecommendations } from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getProductRecommendations = (formData) => {
    return getRecommendations(formData, products);
  };

  return {
    recommendations,
    getRecommendations: getProductRecommendations,
    setRecommendations,
  };
}

export default useRecommendations;
