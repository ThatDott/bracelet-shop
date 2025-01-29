document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector(".cart-list");
  // Retrieve cart from sessionStorage
  let cart = sessionStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // Display cart items
  if (cart.length > 0) {
    cart.forEach((product, index) => {
      const cartItemElement = createCartItem(product, index);
      cartList.appendChild(cartItemElement);
    });
  } else {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  }
});

// Function to create cart item element
function createCartItem(product, index) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-list-item");

  // Product image
  const image = document.createElement("img");
  image.classList.add("cart-list-item-image");
  image.src = product.image;
  image.alt = "Pic";

  // Info container
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("cart-list-item-info");

  // Product name
  const name = document.createElement("p");
  name.classList.add("cart-list-item-name");
  name.textContent = product.name;

  // Product price
  const price = document.createElement("p");
  price.classList.add("cart-list-item-price");
  price.textContent = `₱${product.price}`;

  // Quantity
  const quantity = document.createElement("p");
  quantity.classList.add("cart-list-item-quantity");
  quantity.textContent = `${product.quantity}x`;

  // Total price
  const total = document.createElement("p");
  total.classList.add("cart-list-item-total");
  total.textContent = `Subtotal: ₱${product.price * product.quantity}`;

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-item-button");
  removeButton.textContent = "Remove Item";

  // Remove item event
  removeButton.addEventListener("click", () => removeCartItem(index));

  // Append elements
  infoDiv.appendChild(name);
  infoDiv.appendChild(price);
  infoDiv.appendChild(quantity);
  infoDiv.appendChild(total);
  infoDiv.appendChild(removeButton);

  cartItem.appendChild(image);
  cartItem.appendChild(infoDiv);

  return cartItem;
}

// Function to remove item from cart
function removeCartItem(index) {
  let cart = sessionStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // Reduce item count
  cart[index].quantity -= 1;

  // Remove product if item count is zero
  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }

  // Save Updated Cart
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update Cart Count
  let cartCount = sessionStorage.getItem("cartCount");
  cartCount -= 1;
  sessionStorage.setItem("cartCount", cartCount);

  // Reload the page to update the cart
  location.reload();
}
