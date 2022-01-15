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
    totalElement.innerText = '0';
  } else {
    const product = await fetchItem(sku);
    const { price } = product;
    const currTotal = parseFloat(totalElement.innerText);
    const newTotal = Math.round((!remove ? currTotal + price : currTotal - price) * 100) / 100;
    // const currentTotal = parseFloat(
    //   totalElement.innerText.replace('.', '').replace(',', '.'),
    // );
    // const total = !remove ? currentTotal + price : currentTotal - price;
    // const newTotal = parseFloat(total.toFixed(2)).toLocaleString('pt-BR', {
    //   minimumFractionDigits: 2,
    // });
    totalElement.innerText = newTotal;
  }
}

function saveCart() {
  const cartElements = document.querySelector('.cart').innerHTML;
  const cartToSave = cartElements.slice(cartElements.indexOf('<ol'), cartElements.indexOf('<div>'));
  saveCartItems(cartToSave);
}

async function cartItemClickListener(event) {
  const itemToRemove = event.target;
  document.querySelector('.cart').firstElementChild.removeChild(itemToRemove);
  await updatePrice(itemToRemove.id, 'remove');
  await saveCart();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

async function appendCartItemELement(sku) {
  const productToAdd = await fetchItem(sku);
  const cartElement = createCartItemElement(productToAdd);
  document.querySelector('.cart__items').appendChild(cartElement);
  updatePrice(sku);
}

async function productClickListener(event) {
  const clickedSku = getSkuFromProductItem(event.target.parentElement);
  await appendCartItemELement(clickedSku);
  saveCart();
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

async function loadProducts() {
  const itemsList = document.querySelector('.items');
  const products = await fetchProducts('computador');
  products.results
    .forEach((product) => {
      const element = createProductItemElement(product);
      itemsList.appendChild(element);
    });
}

function addRemoveListener() { 
  const cartElements = document.querySelector('.cart');
  cartElements.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      cartItemClickListener(event);
    }
  });
}

function placeStoredItems() { 
  const cartElements = document.querySelector('.cart');
  const itemsStored = getSavedCartItems();
  if (itemsStored) {
    const initialContent = cartElements.innerHTML;
    cartElements.innerHTML = itemsStored + initialContent.slice(initialContent.indexOf('<div>'));
    const itemsArray = itemsStored.split('id="').join(',').split('">SKU').join(',')
      .split(',');
    itemsArray.filter((item) => item.startsWith('MLB'))
      .forEach((sku) => {
        updatePrice(sku);
      });
  }
}

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    document.querySelector('.cart__items').innerHTML = '';
    updatePrice(null, 'remove');
    saveCart();
  });
}

window.onload = async () => {
  const itemsList = document.querySelector('.items');
  const loading = document.createElement('section');
  loading.className = 'loading';
  loading.innerText = 'Carregando...';
  itemsList.appendChild(loading);
  await loadProducts();
  placeStoredItems();
  addRemoveListener();
  emptyCart();
  itemsList.removeChild(loading);
};
