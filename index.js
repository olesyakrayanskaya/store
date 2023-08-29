'use strict';
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
  {
    id: 11,
    name: 'item-11',
    price: 37,
    description: 'description-11',
  },
  {
    id: 12,
    name: 'item-12',
    price: 26,
    description: 'description-12',
  },
  {
    id: 13,
    name: 'item-13',
    price: 45,
    description: 'description-13',
  },
  {
    id: 14,
    name: 'item-14',
    price: 25,
    description: 'description-14',
  },
  {
    id: 15,
    name: 'item-15',
    price: 27,
    description: 'description-15',
  },
  {
    id: 16,
    name: 'item-16',
    price: 22,
    description: 'description-16',
  },
  {
    id: 17,
    name: 'item-17',
    price: 44,
    description: 'description-17',
  },
  {
    id: 18,
    name: 'item-18',
    price: 11,
    description: 'description-18',
  },
  {
    id: 19,
    name: 'item-19',
    price: 23,
    description: 'description-19',
  },
  {
    id: 20,
    name: 'item-20',
    price: 24,
    description: 'description-20',
  },
];

const dataMap = new Map();

dataItems.forEach((elem) =>
  dataMap.set(elem.id, {
    name: elem.name,
    price: elem.price,
    description: elem.description,
  })
);

const localStorageMap = new Map();
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  localStorageMap.set(`${key}`, `${localStorage.getItem(key)}`);
};

const itemsInCart = new Map(localStorageMap);

addEventListener('DOMContentLoaded', () => {
  dataMap.forEach((value, key) => createItem(value, key));
  openCart();
  closeCart();
  const btnAddToCartArr = document.querySelectorAll('.item__btn');
  btnAddToCartArr.forEach((btn) => {
    btn.addEventListener('click', () => {
      let id = btn.id;
      addToCart(id);
    });
  });
  const removeAllInCartBtn = document.querySelector('.cart__remove');
  removeAllInCartBtn.addEventListener('click', () => {
    removeAllInCart();
  });
});

let sortedMap = new Map();
const select = document.getElementById('sort');
select.addEventListener('change', () => {
  let selectValue = select.value;
  switch (selectValue) {
    case 'name':
      sortedMap = [...dataMap.entries()].sort((a, b) =>
        a[1].name.localeCompare(b[1].name)
      );
      break;
    case 'ascending price':
      sortedMap = [...dataMap.entries()].sort(
        (a, b) => a[1].price - b[1].price
      );
      break;
    case 'descending price':
      sortedMap = [...dataMap.entries()].sort(
        (a, b) => b[1].price - a[1].price
      );
      break;
    default:
      sortedMap = [...dataMap.entries()];
  }
  const mainItems = document.querySelector('.main__items');
  removeAllChildNodes(mainItems);
  sortedMap.forEach((value, key) => createItem(value[1], value[0]));
  const btnAddToCartArr = document.querySelectorAll('.item__btn');
  btnAddToCartArr.forEach((btn) => {
    btn.addEventListener('click', () => {
      let id = btn.id;
      addToCart(id);
    });
  });
  const removeAllInCartBtn = document.querySelector('.cart__remove');
  removeAllInCartBtn.addEventListener('click', () => {
    removeAllInCart();
  });
});

const range = document.querySelector('.filters__range');
const minPriceSpan = document.querySelector('.filter__min-price');
const maxPriceSpan = document.querySelector('.filter__max-price');
sortedMap = [...dataMap.entries()].sort((a, b) => a[1].price - b[1].price);
let minPrice = sortedMap[0][1].price;
let maxPrice = sortedMap[sortedMap.length - 1][1].price;
minPriceSpan.innerHTML = minPrice;
maxPriceSpan.innerHTML = maxPrice;
range.addEventListener('change', () => {
  const filterItems = [...dataMap.entries()]
    .sort((a, b) => a[1].price - b[1].price)
    .filter((el) => el[1].price <= range.value);
  const mainItems = document.querySelector('.main__items');
  removeAllChildNodes(mainItems);
  filterItems.forEach((value, key) => createItem(value[1], value[0]));
  const btnAddToCartArr = document.querySelectorAll('.item__btn');
  btnAddToCartArr.forEach((btn) => {
    btn.addEventListener('click', () => {
      let id = btn.id;
      addToCart(id);
    });
  });
  const removeAllInCartBtn = document.querySelector('.cart__remove');
  removeAllInCartBtn.addEventListener('click', () => {
    removeAllInCart();
  });
});

function createItem(value, key) {
  const mainItems = document.querySelector('.main__items');
  const item = document.createElement('div');
  item.className = 'main__item item';
  mainItems.append(item);
  const name = document.createElement('h3');
  name.className = 'item__name';
  name.innerHTML = value.name;
  item.append(name);
  const itemFooter = document.createElement('footer');
  itemFooter.className = 'item__footer';
  item.append(itemFooter);
  const price = document.createElement('span');
  price.className = 'item__price';
  price.innerHTML = `price: ${value.price} $`;
  itemFooter.append(price);
  const btnAddToCart = document.createElement('button');
  btnAddToCart.className = 'item__btn';
  btnAddToCart.innerHTML = 'add to cart';
  btnAddToCart.setAttribute('id', `${key}`);
  itemFooter.append(btnAddToCart);
}

function openCart() {
  const cartWindow = document.querySelector('.cart');
  const openCart = document.querySelector('.cart-icon');
  openCart.addEventListener('click', () => {
    clearCartItems();
    renderCart();
    totalSum();
    cartWindow.style.display = 'flex';
  });
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

function addToCart(id, amount = 1) {
  itemsInCart.set(id, amount);
  localStorage.setItem(id, amount);
}

function removeAllInCart() {
  clearCartItems();
  itemsInCart.clear();
  const totalSumItem = document.querySelector('.cart__sum');
  totalSumItem.innerHTML = 0;
  localStorage.clear();
}

function clearCartItems() {
  const cartItems = document.querySelector('.cart__items');
  removeAllChildNodes(cartItems);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderCart() {
  itemsInCart.forEach((amount, id, itemsInCart) => {
    const cartItems = document.querySelector('.cart__items');
    const cartItem = document.createElement('div');
    cartItem.className = 'cart__item item';
    cartItems.append(cartItem);
    const cartItemName = document.createElement('div');
    cartItemName.className = 'item__name';
    cartItemName.innerHTML = `${dataMap.get(+id).name}`;
    cartItem.append(cartItemName);
    const cartItemPrice = document.createElement('div');
    cartItemPrice.className = 'item__price';
    cartItemPrice.innerHTML = `${dataMap.get(+id).price}`;
    cartItem.append(cartItemPrice);
    const cartItemAmount = document.createElement('div');
    cartItemAmount.className = 'item__amount';
    cartItemAmount.innerHTML = amount;
    cartItem.append(cartItemAmount);
    const itemMinus = document.createElement('button');
    itemMinus.className = 'item__minus';
    itemMinus.innerHTML = '-';
    cartItem.append(itemMinus);
    itemMinus.addEventListener('click', () => {
      if (amount > 1) {
        amount -= 1;
        cartItemAmount.innerHTML = amount;
        itemsInCart.set(id, amount);
        localStorage.setItem(id, amount);
      } else {
        itemsInCart.delete(id);
        cartItem.remove();
        localStorage.removeItem(id);
      }
      cartItemAmount.innerHTML = amount;
      totalSum();
    });
    const itemPlus = document.createElement('button');
    itemPlus.className = 'item__plus';
    itemPlus.innerHTML = '+';
    cartItem.append(itemPlus);
    itemPlus.addEventListener('click', () => {
      amount += 1;
      cartItemAmount.innerHTML = amount;
      itemsInCart.set(id, amount);
      localStorage.setItem(id, amount);
      totalSum();
    });
    const itemDel = document.createElement('button');
    itemDel.className = 'item__delete';
    itemDel.innerHTML = 'Delete';
    cartItem.append(itemDel);
    itemDel.addEventListener('click', () => {
      itemsInCart.delete(id);
      cartItem.remove();
      totalSum();
      localStorage.removeItem(id);
    });
  });
}

function totalSum() {
  const sumItem = document.querySelector('.cart__sum');
  let totalSum = 0;
  itemsInCart.forEach((amount, id, itemsInCart) => {
    totalSum += dataMap.get(+id).price * amount;
  });
  sumItem.innerHTML = totalSum;
}
