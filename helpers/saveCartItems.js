const saveCartItems = (itemsToStore) => {
    localStorage.setItem('cartItems', itemsToStore);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
