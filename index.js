window.allSlides = window.allSlides || {};
var currentSlide = -1;
var slides = [];

var slideCounter = document.querySelector(".slide_counter");

function setHash(hash) {
  location.hash = hash;
}

function getHash(defaultValue) {
  if (!location.hash || location.hash == "") {
    return defaultValue;
  } else {
    var hash = location.hash;
    if (hash[0] == "#") {
      hash = hash.substring(1);
    }
    return parseInt(hash);
  }
}

function setSlide(idx) {
  var prevSlide = currentSlide;
  currentSlide = Math.max(0, Math.min(idx, slides.length-1));
  if (prevSlide != currentSlide) {
    if (prevSlide >= 0) {
      prevSlideController = window.allSlides[slides[prevSlide].className];
      if (prevSlideController && prevSlideController.hide) {
        prevSlideController.hide();
      }

      slides[prevSlide].style.display = "none";
    }

    slides[currentSlide].style.display = "block";

    currentSlideController = window.allSlides[slides[currentSlide].className];
    if (currentSlideController && currentSlideController.show) {
      currentSlideController.show();
    }

    slideCounter.textContent = currentSlide;

    setHash(currentSlide);
  }
}

function nextSlide() {
  setSlide(currentSlide + 1);
}

function prevSlide() {
  setSlide(currentSlide - 1);
}

slides = document.querySelectorAll(".slides > div");

for (var i = 0; i < slides.length; ++i) {
  var controller = window.allSlides[slides[i].className];
  if (controller && controller.init) {
    controller.init(slides[i]);
  }
}

setSlide(getHash(0));

document.addEventListener("keydown", function(ev) {
  switch (ev.which) {
    case 39:
    case 13:
      nextSlide();
      break;
    case 37:
      prevSlide();
      break;
    default:
      console.log(ev.which);
      break;
  }
});
