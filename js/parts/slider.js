"use strict";

function slider() {
  var slideIndex = 1,
      slides = document.getElementsByClassName('slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.getElementsByClassName('dot');
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    ;

    for (var _i = 0; _i < dots.length; _i++) {
      dots[_i].classList.remove('dot-active');
    }

    ;
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlie(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (var k = 0; k < dots.length + 1; k++) {
      if (event.target.classList.contains('dot') && event.target == dots[k - 1]) {
        currentSlie(k);
      }

      console.log(dots[k]);
    }
  });
}

module.exports = slider;