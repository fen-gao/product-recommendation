import React, { useState, useRef } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationsRef = useRef(null);

  const handleRecommendationsUpdate = (newRecommendations) => {
    setRecommendations(newRecommendations);

    setTimeout(() => {
      if (recommendationsRef.current) {
        recommendationsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Recomendador de Produtos
          </h1>
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
            RD Station
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 border-r border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Configure suas preferências
                </h2>
              </div>
              <Form onRecommendationsUpdate={handleRecommendationsUpdate} />
            </div>

            <div ref={recommendationsRef} className="p-6 md:p-8 bg-gray-50">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Suas recomendações
                </h2>
              </div>
              <RecommendationList recommendations={recommendations} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Produtos recomendados com base em suas preferências e
            funcionalidades selecionadas
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
