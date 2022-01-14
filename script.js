function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadProducts = async () => {
  const itemsList = document.querySelector('.items');
  const products = await fetchProducts();
  products
    .filter((_, index) => index <= 7)
    .forEach((product) => {
      const element = createProductItemElement(product);
      itemsList.appendChild(element);
    });
};

const addToCart = async (sku) => {};

window.onload = () => {
  loadProducts();
};

const itemsList = document.querySelector('.items');
itemsList.addEventListener('click', async (event) => {
  if (event.target.className === 'item__add') {
    const cartList = document.querySelector('.cart__items');
    const clickedSku = getSkuFromProductItem(event.target.parentElement);
    const productToAdd = await fetchItem(clickedSku);
    const cartElement = createCartItemElement(productToAdd);
    cartList.appendChild(cartElement);
  }
});
