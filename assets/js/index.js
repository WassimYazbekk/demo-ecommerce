let cart = loadCartFromSession() || [];

// Save cart to session storage
function saveCartToSession() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from session storage
function loadCartFromSession() {
  const savedCart = sessionStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

function toggleCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display =
    cartContainer.style.display === "none" ? "block" : "none";
}

function addToCart(productName, price) {
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCartToSession();
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <p style="font-size: 1.5rem;">${item.name} - $${item.price} x ${item.quantity}</p>
        <div>
          <button class="btn btn-primary" onclick="updateQuantity('${item.name}', -1)">-</button>
          <button class="btn btn-primary" onclick="updateQuantity('${item.name}', 1)">+</button>
        </div>
      `;
    cartContainer.appendChild(cartItem);
  });

  // Display total price
  const totalPriceElement = document.createElement("div");
  totalPriceElement.classList.add("total-price");
  totalPriceElement.innerHTML = `<p style="font-size: 1.5rem;">Total: $${totalPrice.toFixed(2)}</p>`;
  cartContainer.appendChild(totalPriceElement);

  // Display checkout button
  const checkoutButton = document.createElement("a");
  checkoutButton.classList.add("btn", "btn-success");
  checkoutButton.innerHTML = "Checkout";
  checkoutButton.href = "checkout.html";
  cartContainer.appendChild(checkoutButton);
}

function updateQuantity(productName, change) {
  const product = cart.find((item) => item.name === productName);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.name !== productName);
    }
    saveCartToSession();
    updateCartDisplay();
  }
}

// Initial load of cart display
updateCartDisplay();
