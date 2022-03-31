require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('1 - Deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('2 - Com o argumento "computador", fetch deve ser chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('3 - Com o argumento "computador", fetch utiliza o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('4 - Com o argumento "computador", deve retornar a estrutura de dados correta', async () => {
    await expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  });

  test('5 - Sem argumento, deve retornar a mensagem de erro correta', async () => {
    await expect(fetchProducts()).rejects.toThrow(new Error('You must provide an url'));
  });

  // fail('Teste vazio');
});
