let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.product} - ${item.price}৳`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
}

// WhatsApp Checkout Function
function sendToWhatsApp() {
  const name = document.getElementById("cust-name").value;
  const address = document.getElementById("cust-address").value;
  const phone = document.getElementById("cust-phone").value;

  if (!name || !address || !phone || cart.length === 0) {
    alert("Please fill all fields and add at least one product to cart.");
    return;
  }

  let message = `*La Diva Order*\n\n`;
  message += `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nOrder:\n`;

  let total = 0;
  cart.forEach(item => {
    message += `- ${item.product} - ${item.price}৳\n`;
    total += item.price;
  });

  message += `\nTotal: ${total}৳`;

  const whatsappNumber = "88017XXXXXXXX"; // এখানে আপনার WhatsApp নম্বর বসান
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}