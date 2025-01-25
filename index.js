// Slider
let slideIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  showSlides(slideIndex);
});

function moveSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n >= slides.length) { slideIndex = 0 }
  if (n < 0) { slideIndex = slides.length - 1 }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log(slides[slideIndex]);
  slides[slideIndex].style.display = "block";
}
