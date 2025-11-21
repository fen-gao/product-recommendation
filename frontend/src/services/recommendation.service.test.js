import { getRecommendations } from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('getRecommendations', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  describe('Casos de borda e validações', () => {
    test('Retorna array vazio quando não há produtos', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, []);

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando products é null', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, null);

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando products é undefined', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, undefined);

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando não há selectedRecommendationType', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo'],
        selectedRecommendationType: '',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando nenhum produto tem match', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Feature inexistente'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando tipo de recomendação é inválido', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo'],
        selectedRecommendationType: 'InvalidType',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('Funciona com apenas preferences selecionadas (sem features)', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Funciona com apenas features selecionadas (sem preferences)', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Usa valores padrão quando formData está incompleto', () => {
      const formData = {
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('Produtos são ordenados corretamente por score (maior para menor)', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: ['Rastreamento de comportamento do usuário'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      for (let i = 0; i < recommendations.length - 1; i++) {
        expect(recommendations[i].score).toBeGreaterThanOrEqual(
          recommendations[i + 1].score
        );
      }
    });

    test('Produtos retornados incluem a propriedade score', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = getRecommendations(formData, mockProducts);

      recommendations.forEach((product) => {
        expect(product).toHaveProperty('score');
        expect(typeof product.score).toBe('number');
        expect(product.score).toBeGreaterThan(0);
      });
    });
  });
});
