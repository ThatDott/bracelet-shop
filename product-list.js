function loadProducts(sortId, filterId) {
  const productList = document.querySelector(".product-list");
  const emptyMessage = document.createElement("h2");
  // Message If No Products
  emptyMessage.textContent = "No Items Found";

  const file = "products.json";
  fetch(file)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch JSON: ", error);
      }
      return res.json();
    })
    .then((products) => {
      let productsArray = Object.keys(products).map(key => products[key]);
      
      // Filter Products
      if (filterId != 0) {
        productsArray = productsArray.filter((product) => {
          return (product.category == filterId)
        })
      }

      // Sort Products
      if (sortId != 0) {
        productsArray.sort((a, b) => a[sortId].localeCompare(b[sortId]));
      }
      // Reset Products
      productList.innerHTML = "";

      // Generate Products in DOM
      productsArray.forEach(product => {
        if (product) {
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

          productList.appendChild(newProduct);
        } else {
          productList.appendChild(emptyMessage);
        }
      })
    })
    .catch((error) => console.error("Error: ", error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadProducts("name", 0);
});
