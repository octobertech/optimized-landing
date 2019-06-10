'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function (el) {
      el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

// conversion phone form code
var input = document.querySelector("input"),
    form = document.querySelector("form"),
    result = document.querySelector("#result");

var iti = intlTelInput(input, {
  initialCountry: "kz",
  utilsScript: "lib/utils.js"
});

var errorMap = ["Неверный номер (такой код не существует)", "Неправильный код страны", "Слишком короткий номер", "Слишком длинный номер", "Неверный номер"];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var num = iti.getNumber(),
      valid = iti.isValidNumber();
  if (valid) {
    sendData("num=" + encodeURIComponent(num));
    console.log(num);
    result.className = "help is-success";
    input.className = "input is-medium is-success is-medium";
    result.textContent = "Спасибо! Мы скоро с Вами свяжемся...";
  } else {
    var errorCode = iti.getValidationError();
    input.className = "input is-medium is-danger";
    result.className = "help is-danger is-medium";
    result.textContent = errorMap[errorCode];
  }
}, false);

input.addEventListener("focus", function () {
  result.textContent = "";
  input.className = "input is-medium";
}, false);

function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  urlEncodedData = data;

  // Set up our request
  XHR.open('POST', '../sendphone.php');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(urlEncodedData);
}

// Modals

var rootEl = document.documentElement;
var modals = document.querySelectorAll('.modal');
var modalButtons = document.querySelectorAll('.modal-button');
var modalCloses = document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

if (modalButtons.length > 0) {
  modalButtons.forEach(function (el) {
    el.addEventListener('click', function () {
      var target = el.dataset.target;
      openModals(target);
    });
  });
}

if (modalCloses.length > 0) {
  modalCloses.forEach(function (el) {
    el.addEventListener('click', function () {
      closeModals();
    });
  });
}

function openModals(target) {
  var target = document.getElementById(target);
  rootEl.classList.add('is-clipped');
  target.classList.add('is-active');
}

function closeModals() {
  rootEl.classList.remove('is-clipped');
  modals.forEach(function (el) {
    el.classList.remove('is-active');
  });
}

document.addEventListener('keydown', function (event) {
  var e = event || window.event;
  if (e.keyCode === 27) {
    closeModals();
    closeDropdowns();
  }
});

// foto gallery

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("item-slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

// lazy load images

var observer = lozad();
observer.observe();