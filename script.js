
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkwElRQVZVUB1fk37U5reoX7bop2uHj_MVh7C_nCSsYOg2x1ZcGdTgbp2MqdeigRYWDnpKksTdkOQ4/pub?output=csv';
let cart = [];

function loadProducts() {
  fetch(sheetURL)
    .then(res => res.text())
    .then(csv => {
      const rows = csv.split('\n').slice(1);
      let html = '';
      rows.forEach(row => {
        const [name, price, image] = row.split(',');
        if(name && price && image) {
          html += `
            <div class="product-card">
              <img src="${image}" alt="${name}">
              <h4>${name}</h4>
              <p>৳${price}</p>
              <button onclick="addToCart('${name}', '${price}')">Add to Cart</button>
            </div>`;
        }
      });
      document.getElementById('product-grid').innerHTML = html;
    });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ৳${item.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById('cart-count').textContent = cart.length;
}

function toggleCart() {
  const cartBox = document.getElementById('floating-cart');
  cartBox.style.display = cartBox.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  let message = 'La Diva Order:%0A';
  cart.forEach(item => {
    message += `• ${item.name} - ৳${item.price}%0A`;
  });
  const phone = '01623677687';
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
}

window.onload = () => {
  loadProducts();
  updateCart();
  document.getElementById('floating-cart').style.display = 'block';
};
