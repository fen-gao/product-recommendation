import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange, error }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          id="SingleProduct"
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="mr-4">
          Produto Único
        </label>
        <Checkbox
          id="MultipleProducts"
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

RecommendationType.propTypes = {
  onRecommendationTypeChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RecommendationType.defaultProps = {
  error: null,
};

export default RecommendationType;
