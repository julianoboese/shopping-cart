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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const cartList = document.querySelector('.cart__items');
  const skuToRemove = event.target.innerText.slice(5, 18);
  cartList.removeChild(event.target);
  saveCartItems(skuToRemove, 'remove');
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function appendCartItemELement(sku) {
  const cartList = document.querySelector('.cart__items');
  const productToAdd = await fetchItem(sku);
  const cartElement = createCartItemElement(productToAdd);
  cartList.appendChild(cartElement);
}

function productClickListener(event) {
  const clickedSku = getSkuFromProductItem(event.target.parentElement);
  appendCartItemELement(clickedSku);
  saveCartItems(clickedSku);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', productClickListener);
  section.appendChild(button);

  return section;
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

window.onload = () => {
  loadProducts();
  getSavedCartItems().forEach((sku) => appendCartItemELement(sku));
};
