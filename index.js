'use strict';
const dataItems = [
  {
    id: 1,
    name: 'item-1',
    price: 20,
    description: 'description-1',
    img: './images/1.avif',
  },
  {
    id: 2,
    name: 'item-2',
    price: 30,
    description: 'description-2',
    img: './images/2.avif',
  },
  {
    id: 3,
    name: 'item-3',
    price: 15,
    description: 'description-3',
    img: './images/3.avif',
  },
  {
    id: 4,
    name: 'item-4',
    price: 22,
    description: 'description-4',
    img: './images/4.avif',
  },
  {
    id: 5,
    name: 'item-5',
    price: 15,
    description: 'description-5',
    img: './images/5.webp',
  },
  {
    id: 6,
    name: 'item-6',
    price: 20,
    description: 'description-6',
    img: './images/6.avif',
  },
  {
    id: 7,
    name: 'item-7',
    price: 15,
    description: 'description-7',
    img: './images/7.avif',
  },
  {
    id: 8,
    name: 'item-8',
    price: 25,
    description: 'description-8',
    img: './images/8.avif',
  },
  {
    id: 9,
    name: 'item-9',
    price: 20,
    description: 'description-9',
    img: './images/9.avif',
  },
  {
    id: 10,
    name: 'item-10',
    price: 15,
    description: 'description-10',
    img: './images/10.avif',
  },
  {
    id: 11,
    name: 'item-11',
    price: 37,
    description: 'description-11',
    img: './images/11.avif',
  },
  {
    id: 12,
    name: 'item-12',
    price: 26,
    description: 'description-12',
    img: './images/12.avif',
  },
  {
    id: 13,
    name: 'item-13',
    price: 45,
    description: 'description-13',
    img: './images/13.avif',
  },
  {
    id: 14,
    name: 'item-14',
    price: 25,
    description: 'description-14',
    img: './images/14.avif',
  },
  {
    id: 15,
    name: 'item-15',
    price: 27,
    description: 'description-15',
    img: './images/15.avif',
  },
  {
    id: 16,
    name: 'item-16',
    price: 22,
    description: 'description-16',
    img: './images/16.avif',
  },
  {
    id: 17,
    name: 'item-17',
    price: 44,
    description: 'description-17',
    img: './images/17.avif',
  },
  {
    id: 18,
    name: 'item-18',
    price: 11,
    description: 'description-18',
    img: './images/18.avif',
  },
  {
    id: 19,
    name: 'item-19',
    price: 23,
    description: 'description-19',
    img: './images/19.avif',
  },
  {
    id: 20,
    name: 'item-20',
    price: 24,
    description: 'description-20',
    img: './images/20.avif',
  },
];

const dataMap = new Map();

dataItems.forEach((elem) =>
  dataMap.set(elem.id, {
    name: elem.name,
    price: elem.price,
    description: elem.description,
    img: elem.img,
  })
);

const totalNumbItems = dataItems.length;
const showItems = 6;
let firstIndex = 0;
let lastIndex = showItems;

function createShowItems(arr) {
  for (let i = firstIndex; i < lastIndex; i++) {
    createItem(arr[i]);
  }
}

function createBtnShowMoreItems() {
  if (totalNumbItems > showItems) {
    const mainItems = document.querySelector('.main__items');
    const btnShowMoreItems = document.createElement('button');
    btnShowMoreItems.className = 'main__btn';
    btnShowMoreItems.innerHTML = 'more products';
    mainItems.append(btnShowMoreItems);
  }
}

function showMoreItems(arr) {
  const btnShowMoreItems = document.querySelector('.main__btn');

  btnShowMoreItems.addEventListener('click', () => {
    if (firstIndex < totalNumbItems - showItems) {
      firstIndex += showItems;
    } else {
      firstIndex = totalNumbItems;
      btnShowMoreItems.remove();
    }
    if (lastIndex < totalNumbItems - showItems) {
      lastIndex += showItems;
    } else {
      lastIndex = totalNumbItems;
      btnShowMoreItems.remove();
    }
    createShowItems(arr);
  });
}

const localStorageMap = new Map();
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  localStorageMap.set(`${key}`, `${localStorage.getItem(key)}`);
}

const itemsInCart = new Map(localStorageMap);
const amountItemsInCart = document.querySelector('.cart-amount');
amountItemsInCart.innerHTML = itemsInCart.size;

addEventListener('DOMContentLoaded', () => {
  createShowItems(dataItems);
  openCart();
  closeCart();
  addRemoveItemsInCart();
  createBtnShowMoreItems();
  showMoreItems(dataItems);
});

function addRemoveItemsInCart() {
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
}

let sortedArray = [];
const select = document.getElementById('sort');
select.addEventListener('change', () => {
  let selectValue = select.value;
  switch (selectValue) {
    case 'name':
      sortedArray = [...dataItems].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'ascending price':
      sortedArray = [...dataItems].sort((a, b) => a.price - b.price);
      break;
    case 'descending price':
      sortedArray = [...dataItems].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedArray = [...dataItems];
  }
  const mainItems = document.querySelector('.main__items');
  removeAllChildNodes(mainItems);
  firstIndex = 0;
  lastIndex = showItems;
  createShowItems(sortedArray);
  createBtnShowMoreItems();
  showMoreItems(sortedArray);
  addRemoveItemsInCart();
});

function createItem(value) {
  const mainItems = document.querySelector('.main__items');
  const item = document.createElement('div');
  item.className = 'main__item item';
  mainItems.append(item);
  const name = document.createElement('h3');
  name.className = 'item__name';
  name.innerHTML = value.name;
  item.append(name);
  const image = document.createElement('img');
  image.className = 'item__img';
  image.src = `${value.img}`;
  image.alt = 'img';
  item.append(image);
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
  btnAddToCart.setAttribute('id', `${value.id}`);
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
  amountItemsInCart.innerHTML = itemsInCart.size;
}

function removeAllInCart() {
  clearCartItems();
  itemsInCart.clear();
  const totalSumItem = document.querySelector('.cart__sum');
  totalSumItem.innerHTML = 0;
  localStorage.clear();
  amountItemsInCart.innerHTML = itemsInCart.size;
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
    cartItem.className = 'cart__item item-cart';
    cartItems.append(cartItem);
    const cartItemImg = document.createElement('img');
    cartItemImg.className = 'item-cart__img';
    cartItemImg.src = `${dataMap.get(+id).img}`;
    cartItem.append(cartItemImg);
    const cartItemName = document.createElement('div');
    cartItemName.className = 'item-cart__name';
    cartItemName.innerHTML = `${dataMap.get(+id).name}`;
    cartItem.append(cartItemName);
    const cartItemPrice = document.createElement('div');
    cartItemPrice.className = 'item-cart__price';
    cartItemPrice.innerHTML = `${dataMap.get(+id).price}`;
    cartItem.append(cartItemPrice);
    const cartItemAmount = document.createElement('div');
    cartItemAmount.className = 'item-cart__amount';
    cartItemAmount.innerHTML = amount;
    cartItem.append(cartItemAmount);
    const itemMinus = document.createElement('button');
    itemMinus.className = 'item-cart__minus';
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
        amountItemsInCart.innerHTML = itemsInCart.size;
      }
      cartItemAmount.innerHTML = amount;
      totalSum();
    });
    const itemPlus = document.createElement('button');
    itemPlus.className = 'item-cart__plus';
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
    itemDel.className = 'item-cart__delete';
    itemDel.innerHTML = 'Delete';
    cartItem.append(itemDel);
    itemDel.addEventListener('click', () => {
      itemsInCart.delete(id);
      cartItem.remove();
      totalSum();
      localStorage.removeItem(id);
      amountItemsInCart.innerHTML = itemsInCart.size;
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
