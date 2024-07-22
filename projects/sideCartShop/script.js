const ITEMS = [
	{
		id: 0,
		name: 'Iphone 14 Pro Max',
		price: 1099,
		image: 'iphone.jpg',
		qty: 1,
	},
	{
		id: 1,
		name: 'Samsung Galaxy s23 Ultra',
		price: 1199,
		image: 'samsung_galaxy.jpg',
		qty: 1,
	},
	{
		id: 2,
		name: 'Google Pixel 7 Pro',
		price: 899,
		image: 'google_pixel.jpg',
		qty: 1,
	},
	{
		id: 3,
		name: 'One Plus 11 5G',
		price: 699,
		image: 'one_plus.jpg',
		qty: 1,
	},
];

const openBtn = document.getElementById('open-cart-btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close-btn');
const backdrop = document.querySelector('.backdrop');
const itemsEl = document.querySelector('.items');
const cartItems = document.querySelector('.cart-items');
const itemsNum = document.getElementById('items-num');
const subtotalPrice = document.querySelector('.subtotal-price');

let cart_data = [];

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

renderItems();
renderCartItems();

function openCart() {
	cart.classList.add('open');
	backdrop.style.display = 'block';

	setTimeout(() => {
		backdrop.classList.add('show');
	}, 0);
}

function closeCart() {
	cart.classList.remove('open');
	backdrop.classList.remove('show');

	setTimeout(() => {
		backdrop.style.display = 'none';
	}, 500);
}

function addItem(idx, itemId) {
	const foundedItem = cart_data.find(
		(item) => item.id.toString() === itemId.toString()
	);

	if (foundedItem) {
		increaseQty(itemId);
	} else {
		cart_data.push(ITEMS[itemId]);
	}
	updateCart();
	openCart();
}

function removeCartItem(itemId) {
	cart_data = cart_data.filter((item) => item.id != itemId);

	updateCart();
}

function increaseQty(itemId) {
	cart_data = cart_data.map((item) =>
		item.id.toString() === itemId.toString()
			? { ...item, qty: item.qty + 1 }
			: item
	);

  updateCart()
}

function decreaseQty(itemId) {
  cart_data = cart_data.map((item) =>
    item.id.toString() === itemId.toString()
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty}
      : item
  );

  updateCart();
}

function calcItemsNum() {
  let itemsCount = 0;

  cart_data.forEach(item => (itemsCount += item.qty));

  itemsNum.innerText = itemsCount;
}

function calcSubtotalPrice() {
  let subtotal = 0;

  cart_data.forEach((item) => (subtotal += item.price * item.qty));

  subtotalPrice.innerText = subtotal;
}

function renderItems() {
	ITEMS.forEach((item, idx) => {
		const itemEl = document.createElement('div');
		itemEl.classList.add('item');
		itemEl.onclick = () => addItem(idx, item.id);
		itemEl.innerHTML = `
    <img src='${item.image}' alt='image' />
    <button> Add To Cart</button>
    `;
		itemsEl.appendChild(itemEl);
	});
}

function renderCartItems() {
	cartItems.innerHTML = '';
	cart_data.forEach((item) => {
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
		cartItem.innerHTML = `
        <div class="remove-item" onclick='removeCartItem(${item.id})'>
        <span>&times;</span>
      </div>
      <div class="item-img">
        <img src="${item.image}" alt="">
      </div>
      <div class="item-details">
        <p>${item.name}</p>
        <strong>$${item.price}</strong>
        <div class="qty">
          <span onclick='decreaseQty(${item.id})'>-</span>
          <strong>${item.qty}</strong>
          <span onclick='increaseQty(${item.id})'>+</span>
        </div>
      </div>
    `;
		cartItems.appendChild(cartItem);
	});
}

function updateCart() {
  renderCartItems();
  calcItemsNum();
  calcSubtotalPrice();
}