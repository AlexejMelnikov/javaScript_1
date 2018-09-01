"use strict";

function modal() {
  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      btnDesc = document.querySelectorAll('.description-btn');
  more.addEventListener('click', function () {
    console.log(more);
    more.classList.add('more-splash');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  var _loop = function _loop(i) {
    btnDesc[i].addEventListener('click', function () {
      btnDesc[i].classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  };

  for (var i = 0; i < btnDesc.length; i++) {
    _loop(i);
  }

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
}

module.exports = modal;