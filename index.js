const dataItems = [
  {
    id: 1,
    name: 'item-1',
    price: 20,
    description: 'description-1',
  },
  {
    id: 2,
    name: 'item-2',
    price: 30,
    description: 'description-2',
  },
  {
    id: 3,
    name: 'item-3',
    price: 15,
    description: 'description-3',
  },
  {
    id: 4,
    name: 'item-4',
    price: 22,
    description: 'description-4',
  },
  {
    id: 5,
    name: 'item-5',
    price: 15,
    description: 'description-5',
  },
  {
    id: 6,
    name: 'item-6',
    price: 20,
    description: 'description-6',
  },
  {
    id: 7,
    name: 'item-7',
    price: 15,
    description: 'description-7',
  },
  {
    id: 8,
    name: 'item-8',
    price: 25,
    description: 'description-8',
  },
  {
    id: 9,
    name: 'item-9',
    price: 20,
    description: 'description-9',
  },
  {
    id: 10,
    name: 'item-10',
    price: 15,
    description: 'description-10',
  },
];

addEventListener('DOMContentLoaded', () => {
  dataItems.forEach((el) => createItem(el));
  openCart();
  closeCart();
});

function createItem(el) {
  const mainItems = document.querySelector('.main__items');
  const item = document.createElement('div');
  item.className = 'main__item item';
  mainItems.append(item);
  const name = document.createElement('h3');
  name.className = 'item__name';
  name.innerHTML = el.name;
  item.append(name);
  const itemFooter = document.createElement('footer');
  itemFooter.className = 'item__footer';
  item.append(itemFooter);
  const price = document.createElement('span');
  price.className = 'item__price';
  price.innerHTML = `price: ${el.price} $`;
  itemFooter.append(price);
  const btnAddToCart = document.createElement('button');
  btnAddToCart.className = 'item__btn';
  btnAddToCart.innerHTML = 'add to cart';
  itemFooter.append(btnAddToCart);
}

function openCart() {
  const cartWindow = document.querySelector('.cart');
  const openCart = document.querySelector('.cart-icon');
  openCart.addEventListener('click', () => (cartWindow.style.display = 'flex'));
}

function closeCart() {
  const cartWindow = document.querySelector('.cart');
  const closeCart = document.querySelector('.cart__close');
  closeCart.addEventListener(
    'click',
    () => (cartWindow.style.display = 'none')
  );
  window.onclick = function (event) {
    if (event.target == cartWindow) {
      cartWindow.style.display = 'none';
    }
  };
}
