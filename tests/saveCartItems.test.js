const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  test('1 - Com o argumento "<ol><li>Item</li></ol>", localStorage.setItem deve ser chamado', () => {
    saveCartItems("<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('2 - Com o argumento "<ol><li>Item</li></ol>", localStorage.setItem deve ser chamado com os parâmetros corretos', () => {
    saveCartItems("<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', "<ol><li>Item</li></ol>");
  });

  // fail('Teste vazio');
});
