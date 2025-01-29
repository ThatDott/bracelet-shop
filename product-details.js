document.addEventListener("DOMContentLoaded", () => {
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  const urlId = urlParams.get("id");

  // Fetch JSON file and transform into Product Array
  function fetchProducts(callback) {
    const file = "products.json";
    fetch(file)
      .then((res) => {
        if (!res.ok) {
          throw new error("Failed to fetch JSON: ", error);
        }
        return res.json();
      })
      .then((products) => {
        let productsArray = Object.keys(products).map((key) => ({
          ...products[key],
          index: key,
        }));
        
        // Get product with matching Id
        const product = productsArray.find((prod) => prod.index === urlId);
        callback(product);
      })
      .catch((error) => console.error("Error: ", error));
  }

  // Load Product Info into DOM
  function loadProduct(product) {
    // Find existing elements in DOM
    const name = document.getElementById("product-name");
    const category = document.getElementById("product-category");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");
    const image = document.getElementById("product-image");

    // Replace DOM elements' content based on JSON file
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
      image.src = "";
    }
  }
  
  // Add to Cart Button Function
  function addToCart(product) {
    if (product) {
      // Get Saved Cart Count or default to 0
      let cartCount = localStorage.getItem("cartCount");
      cartCount = cartCount ? parseInt(cartCount) : 0;
      
      // Increment and Store New Count
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      alert(`Added '${product.name}' to shopping cart.\nTotal Items: ${cartCount}`);
    } else {
      alert("Product not found. Cannot add to cart.");
    }
  }

  // Fetch Product and Set Up Button listener
  fetchProducts((product) => {
    loadProduct(product);

    const addToCartButton = document.getElementById("add-to-cart");
    const buyNowButton = document.getElementById("buy-now");
    if (addToCartButton && buyNowButton) {
      addToCartButton.addEventListener("click", () => addToCart(product));
      buyNowButton.addEventListener("click", () => {
        addToCart(product);
        window.location.href = "./cart.html";
      });
    }
  });
});
