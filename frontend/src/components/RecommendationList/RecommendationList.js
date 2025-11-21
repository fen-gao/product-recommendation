import React from 'react';
import PropTypes from 'prop-types';

const categoryColors = {
  Vendas: 'bg-purple-100 text-purple-700 border-purple-300',
  Marketing: 'bg-blue-100 text-blue-700 border-blue-300',
  Omnichannel: 'bg-green-100 text-green-700 border-green-300',
  'Uso de Inteligência Artificial':
    'bg-orange-100 text-orange-700 border-orange-300',
};

const categoryIcons = {
  Vendas: '💼',
  Marketing: '📈',
  Omnichannel: '💬',
  'Uso de Inteligência Artificial': '🤖',
};

function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Aguardando recomendações
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Preencha o formulário ao lado e clique em "Obter recomendação" para
          ver os produtos ideais para você.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          {recommendations.length === 1
            ? '1 produto recomendado'
            : `${recommendations.length} produtos recomendados`}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={recommendation.id || index}
            className="bg-white rounded-lg border-2 border-gray-200 p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">
                  {categoryIcons[recommendation.category] || '📦'}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {recommendation.name}
                  </h3>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border ${
                      categoryColors[recommendation.category] ||
                      'bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    {recommendation.category}
                  </span>
                </div>
              </div>
              {recommendation.score && (
                <div className="flex flex-col items-center bg-blue-50 rounded-lg px-3 py-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {recommendation.score}
                  </span>
                  <span className="text-xs text-gray-600">pontos</span>
                </div>
              )}
            </div>

            {/* Features & Preferences */}
            <div className="space-y-3 mt-4">
              {recommendation.preferences &&
                recommendation.preferences.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Preferências
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.preferences.slice(0, 2).map((pref, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md"
                        >
                          {pref}
                        </span>
                      ))}
                      {recommendation.preferences.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{recommendation.preferences.length - 2} mais
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {recommendation.features &&
                recommendation.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Funcionalidades
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.features.slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md"
                        >
                          {feat}
                        </span>
                      ))}
                      {recommendation.features.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{recommendation.features.length - 2} mais
                        </span>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      score: PropTypes.number,
      preferences: PropTypes.arrayOf(PropTypes.string),
      features: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

RecommendationList.defaultProps = {
  recommendations: [],
};

export default RecommendationList;
