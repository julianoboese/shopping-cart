const fetchProducts = async (query) => {
  if (!query) {
    throw new Error('You must provide an url');
  }

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
