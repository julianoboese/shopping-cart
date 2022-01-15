const saveCartItems = (sku, remove) => {
  const itemsStored = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (!remove) {
    itemsStored.push(sku);
  } else if (!sku) {
    itemsStored.length = 0;
  } else {
    itemsStored.splice(itemsStored.indexOf(sku), 1);
  }
  localStorage.setItem('cartItems', JSON.stringify(itemsStored));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
