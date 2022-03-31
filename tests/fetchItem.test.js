require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('1 - Deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('2 - Com o argumento "MLB1615760527", fetch deve ser chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('3 - Com o argumento "MLB1615760527", fetch utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('4 - Com o argumento "MLB1615760527", deve retornar a estrutura de dados correta', async () => {
    await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  });

  test('5 - Sem argumento, deve retornar a mensagem de erro correta', async () => {
    await expect(fetchItem()).rejects.toThrow(new Error('You must provide an url'));
  });

  // fail('Teste vazio');
});
