const fetchProducts = async (search) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
