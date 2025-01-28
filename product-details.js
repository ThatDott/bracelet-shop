document.addEventListener("DOMContentLoaded", () => {
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  const urlId = urlParams.get("id");

  // Fetch JSON file
  function fetchProducts(callback) {
    const file = "products.json";
    fetch(file)
      .then((res) => {
        if (!res.ok) {
          console.error("Failed to fetch JSON: ", error);
        }
        return res.json();
      })
      .then((products) => {
        let productsArray = Object.keys(products).map((key) => ({
          ...products[key],
          index: key,
        }));
        callback(productsArray);
      })
      .catch((error) => console.error("Error: ", error));
  }

  function loadProduct(productsArray) {
    const name = document.getElementById("product-name");
    const category = document.getElementById("product-category");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");
    const image = document.getElementById("product-picture");

    const product = productsArray.find((prod) => prod.index === urlId);

    if(product) {
      name.innerHTML = product.name;
      category.innerHTML = product.category;
      price.innerHTML = product.price;
      description.innerHTML = product.description;
      image.src = product.image;
    } else {
      name.innerHTML = "Product not found";
      category.innerHTML = "";
      price.innerHTML = "";
      description.innerHTML = "";
      image.src = product.image;

    }
  }
  fetchProducts(loadProduct);
});
