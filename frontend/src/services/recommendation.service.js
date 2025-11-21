/**
 * Calculates a product's score based on selected preferences and features.
 * @param {Object} product - Product to be evaluated
 * @param {Array} selectedPreferences - Selected preferences by the user
 * @param {Array} selectedFeatures - Selected features by the user
 * @returns {number} Product's score
 */
const calculateProductScore = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  let score = 0;

  selectedPreferences.forEach((preference) => {
    if (product.preferences.includes(preference)) {
      score++;
    }
  });

  selectedFeatures.forEach((feature) => {
    if (product.features.includes(feature)) {
      score++;
    }
  });

  return score;
};

/**
 * Returns the recommended products based on the selected preferences and features
 * @param {Object} formData - Form data containing selectedPreferences, selectedFeatures and selectedRecommendationType
 * @param {Array} products - List of available products
 * @returns {Array} List of recommended products
 */
const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  if (!products || products.length === 0 || !selectedRecommendationType) {
    return [];
  }

  const productsWithScore = products.map((product) => ({
    ...product,
    score: calculateProductScore(
      product,
      selectedPreferences,
      selectedFeatures
    ),
  }));

  const matchedProducts = productsWithScore.filter(
    (product) => product.score > 0
  );

  if (matchedProducts.length === 0) {
    return [];
  }

  const sortedProducts = matchedProducts.sort((a, b) => {
    if (b.score === a.score) {
      return 0;
    }

    return b.score - a.score;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    const maxScore = sortedProducts[0].score;

    const topProducts = sortedProducts.filter(
      (product) => product.score === maxScore
    );

    return [topProducts[topProducts.length - 1]];
  }

  if (selectedRecommendationType === 'MultipleProducts') {
    return sortedProducts;
  }

  return [];
};

export default { getRecommendations };
