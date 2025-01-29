// Header Change Color After Scrolling
window.addEventListener('scroll', function() {
  var nav = document.querySelector(".navbar");
  var stickyElement = document.querySelector(".main-header").offsetTop;
  var scrollDistance = window.scrollY;

  if (scrollDistance > stickyElement){
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

function updateCartCount() {
    let cartCount = sessionStorage.getItem("cartCount" || 0);
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.innerHTML = `CART(${cartCount})`;
}

// Cart Count
document.addEventListener("click", updateCartCount);
document.addEventListener("DOMContentLoaded", updateCartCount);

