
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

