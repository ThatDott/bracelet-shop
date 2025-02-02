let currentSortId = "name";
let currentFilterId = 0;
let currentSearchQuery = "";

// Set Active Button
function setActiveButton(e, buttonClass) {
  document.querySelectorAll(buttonClass).forEach(button => button.classList.remove("active"));
  e.currentTarget.classList.add("active");
}

// Set Sort Id
function sortProducts(e, newSortId) {
  setActiveButton(e, ".sort-button");
  currentSortId = newSortId;
  loadProducts(currentSortId, currentFilterId, currentSearchQuery);
}

// Set Filter Id
function filterProducts(e, newFilterId) {
  setActiveButton(e, ".filter-button");
  currentFilterId = newFilterId;
  loadProducts(currentSortId, currentFilterId, currentSearchQuery);
}

// Set Search Query
function searchProducts() {
  currentSearchQuery = searchInput.value.trim(); // Remove extra spaces
  loadProducts(currentSortId, currentFilterId, currentSearchQuery);
}

// Load Products
function loadProducts(sortId, filterId, searchQuery) {
  const productList = document.querySelector(".product-list");
  const emptyMessage = document.createElement("h2");

  // Message If No Products
  emptyMessage.textContent = "No Items Found";
  emptyMessage.classList.add("empty-message");

  // Fetch JSON file from Backend Server
  const collection = `http://localhost:5000/products?sort=${sortId}&filter=${filterId}&search=${searchQuery}`;
  fetch(collection)
    .then((res) => res.json())
    .then((productsArray) => {
      console.log(productsArray);

      // Reset Products
      productList.innerHTML = "";

      // Generate Products in DOM
      productsArray.forEach((product) => {
        if (productsArray.length !== 0) {
          const newProduct = document.createElement("div");
          const name = document.createElement("h3");
          const price = document.createElement("h4");
          const category = document.createElement("h5");

          newProduct.classList.add("product-list-item");
          name.textContent = product.name;
          price.textContent = product.price;
          category.textContent = product.category;

          newProduct.appendChild(name);
          newProduct.appendChild(price);
          newProduct.appendChild(category);

          newProduct.onclick = (() => {
            window.location.href = `product-details.html?id=${product.id}`
          })

          productList.appendChild(newProduct);
        } else {
          productList.appendChild(emptyMessage);
        }
      });
    })
    .catch((error) => console.error("Error: ", error));
}

// Initialization
document.addEventListener("DOMContentLoaded", function () {
  loadProducts(currentSortId, currentFilterId, currentSearchQuery);
  searchInput = document.getElementById("searchInput"); 
  searchInput.addEventListener("input", searchProducts);
});
