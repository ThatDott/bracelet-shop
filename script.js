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

// Slider
let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
  showSlides(slideIndex += n)
}

function currentSlide(n) {
  showSlides(slideIndex = n)
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.remove("active");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
