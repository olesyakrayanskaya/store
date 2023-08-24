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

const dataMap = new Map();
const itemsInCart = new Set();

dataItems.forEach((elem) =>
  dataMap.set(elem.id, {
    name: elem.name,
    price: elem.price,
    description: elem.description,
  })
);

addEventListener('DOMContentLoaded', () => {
  dataMap.forEach((value, key, map) => createItem(value, key));
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
    renderCart();
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

function addToCart(id) {
  itemsInCart.add(id);
}

function removeAllInCart() {
  const cartItems = document.querySelector('.cart__items');
  removeAllChildNodes(cartItems);
  itemsInCart.clear();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderCart() {
  itemsInCart.forEach((id) => {
    let amount = 1;
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
      } else {
        itemsInCart.delete(id);
        cartItem.remove();
      }
      cartItemAmount.innerHTML = amount;
    });
    const itemPlus = document.createElement('button');
    itemPlus.className = 'item__plus';
    itemPlus.innerHTML = '+';
    cartItem.append(itemPlus);
    itemPlus.addEventListener('click', () => {
      amount += 1;
      cartItemAmount.innerHTML = amount;
    });
    const itemDel = document.createElement('button');
    itemDel.className = 'item__delete';
    itemDel.innerHTML = 'Delete';
    cartItem.append(itemDel);
    itemDel.addEventListener('click', () => {
      itemsInCart.delete(id);
      cartItem.remove();
    });
  });
}

function clearCart() {
  localStorage.clear();
}
