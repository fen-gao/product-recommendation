import React from 'react';
import PropTypes from 'prop-types';

function RecommendationType({ onRecommendationTypeChange, error }) {
  const [selected, setSelected] = React.useState('');

  const handleChange = (value) => {
    setSelected(value);
    onRecommendationTypeChange(value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">🎯</span>
        <h3 className="text-lg font-semibold text-gray-800">
          Tipo de Recomendação
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="SingleProduct"
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selected === 'SingleProduct'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
        >
          <input
            id="SingleProduct"
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={selected === 'SingleProduct'}
            onChange={() => handleChange('SingleProduct')}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <div className="ml-3 flex-1">
            <span className="font-medium text-gray-900">Produto Único</span>
            <p className="text-xs text-gray-500 mt-1">
              Recomenda o melhor produto para suas necessidades
            </p>
          </div>
        </label>

        <label
          htmlFor="MultipleProducts"
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selected === 'MultipleProducts'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
        >
          <input
            id="MultipleProducts"
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={selected === 'MultipleProducts'}
            onChange={() => handleChange('MultipleProducts')}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <div className="ml-3 flex-1">
            <span className="font-medium text-gray-900">
              Múltiplos Produtos
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Recomenda todos os produtos relevantes ordenados por match
            </p>
          </div>
        </label>
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

RecommendationType.propTypes = {
  onRecommendationTypeChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RecommendationType.defaultProps = {
  error: null,
};

export default RecommendationType;
