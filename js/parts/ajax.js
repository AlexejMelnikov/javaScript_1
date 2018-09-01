"use strict";

function ajax() {
  var form = document.getElementsByClassName('main-form')[0],
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage); // AJAX

    var request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
    var formData = new FormData(form); // отправка запроса

    request.send(formData);
    var image = document.createElement('img');
    statusMessage.appendChild(image);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        image.src = "gif/ajax-loader.svg";
      } else if (request.readyState === 4) {
        // console.log(request.readyState+"  "+request.status);
        if (request.status === 200 && request.status < 300) {
          image.src = "gif/success1.png";
        } else {
          image.src = "gif/failure.jpg";
        }
      }
    };

    console.log(request.readyState);

    for (var i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  }); // ajax запрос контактной формы

  var contact_form = document.getElementById('form'),
      inputs = contact_form.getElementsByTagName('input'),
      statusMessages = document.createElement('div');
  statusMessages.classList.add('status');
  contact_form.addEventListener('submit', function (event) {
    event.preventDefault();
    contact_form.appendChild(statusMessages); // AJAX

    var request = new XMLHttpRequest(); // настройка запроса

    request.open('POST', 'server.php');
    request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
    var formData = new FormData(contact_form);
    request.send(formData);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        // statusMessages.innerHTML = message.loading;
        image.src = "gif/ajax-loader.svg";
      } else if (request.readyState === 4) {
        if (request.status === 200 && request.status < 300) {
          // statusMessages.innerHTML = message.succes;
          image.src = "gif/success1.png"; // добавляем данные
        } else {
          // statusMessages.innerHTML = message.failure;
          image.src = "gif/failure.jpg";
        }
      }
    };

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  });
}

module.exports = ajax;