import products from './products.js';

const cart = () => {
	let iconCart = document.querySelector('.icon-cart');
	let closeBtn = document.querySelector('.cartTab .close');
	let body = document.querySelector('body');
	let cart = [];

	iconCart.addEventListener('click', () => {
		body.classList.toggle('activeTabCart');
	});

	closeBtn.addEventListener('click', () => {
		body.classList.toggle('activeTabCart');
	});

	const setProductInCart = (idProduct, quantity, position) => {
		if (quantity > 0) {
			if (position < 0) {
				cart.push({
					product_id: idProduct,
					quantity: quantity,
				});
			} else {
				cart[position].quantity = quantity;
			}
		} else {
			cart.splice(position, 1);
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		refreshCartHTML();
	};

	const refreshCartHTML = () => {
    let listHTML = document.querySelector('.listCart');
    listHTML.innerHTML = '';
		let totalHTML = document.querySelector('.icon-cart span');
		let totalQuantity = 0;
		cart.forEach((item) => {
			totalQuantity = totalQuantity + item.quantity;
			let position = products.findIndex(
				(value) => value.id == item.product_id
			);
			let info = products[position];
			let newItem = document.createElement('div');
			newItem.classList.add('item');
			newItem.innerHTML = `
      <div class='image'>
      <img src='${info.image}' />
      </div>
      <div class='name'>${info.name}</div>
      <div class='totalPrice'>$
      ${info.price * item.quantity}</div>
      <div class='quantity'>
      <span class='minus' data-id='${info.id}'>-</span>
      <span>${item.quantity}</span>
      <span class='plus' data-id='${info.id}'>+</span>
      </div>
      `;

			listHTML.appendChild(newItem);
		});
		totalHTML.innerHTML = totalQuantity;
	};

	document.addEventListener('click', (event) => {
		let buttonClick = event.target;
		let idProduct = buttonClick.dataset.id;
		let position = cart.findIndex((value) => value.product_id == idProduct);
		let quantity = position < 0 ? 0 : cart[position].quantity;

		if (
			buttonClick.classList.contains('addCart') ||
			buttonClick.classList.contains('plus')
		) {
			quantity++;
			setProductInCart(idProduct, quantity, position);
		} else if (buttonClick.classList.contains('minus')) {
			quantity--;
			setProductInCart(idProduct, quantity, position);
		}
	});
	const initApp = () => {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		refreshCartHTML();
	}
	initApp();
}
export default cart;
