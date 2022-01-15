const cartList = document.querySelector('.cart__items');

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

async function updatePrice(sku, remove) {
  const totalElement = document.querySelector('.total-price');
  if (!sku) {
    totalElement.innerText = '0,00';
  } else {
    const product = await fetchItem(sku);
    const { price } = product;
    const currentTotal = parseFloat(
      totalElement.innerText.replace('.', '').replace(',', '.'),
    );
    const total = !remove ? currentTotal + price : currentTotal - price;
    const newTotal = parseFloat(total.toFixed(2)).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    });
    totalElement.innerText = newTotal;
  }
}

function cartItemClickListener(event) {
  const skuToRemove = event.target.id;
  cartList.removeChild(event.target);
  updatePrice(skuToRemove, 'remove');
  saveCartItems(skuToRemove, 'remove');
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function appendCartItemELement(sku) {
  const productToAdd = await fetchItem(sku);
  const cartElement = createCartItemElement(productToAdd);
  cartList.appendChild(cartElement);
  updatePrice(sku);
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

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    cartList.innerHTML = '';
    updatePrice(null, 'remove');
    saveCartItems(null, 'remove');
  });
}

async function loadProducts() {
  const itemsList = document.querySelector('.items');
  const products = await fetchProducts();
  products
    .filter((_, index) => index <= 7)
    .forEach((product) => {
      const element = createProductItemElement(product);
      itemsList.appendChild(element);
    });
}

window.onload = () => {
  loadProducts();
  getSavedCartItems().forEach((sku) => appendCartItemELement(sku));
  emptyCart();
};
