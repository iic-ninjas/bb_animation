window.allSlides = window.allSlides || {};

(function() {

  function Testing() {
  }

  Testing.prototype.init = function(container) {
    this.container = container;
    this.box = container.querySelector(".box_container");
    this.content = container.querySelector(".content");
    this.items = container.querySelectorAll("li");
    this.buttons = container.querySelectorAll(".button");
    this.text = container.querySelector(".val");

    this.input = container.querySelector("input");
    this.input.addEventListener("input", this.change.bind(this));
    this.animate(parseFloat(this.input.value));
  };

  Testing.prototype.show = function() {
  };

  Testing.prototype.hide = function() {
  };

  Testing.prototype.change = function() {
    this.animate(parseFloat(this.input.value));
  };

  Testing.prototype.animate = function(t) {
    this.text.textContent = "t = " + t.toFixed(3);
    this.box.style.height = Animator.lerp(t, 50, 360);
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].style.opacity = Animator.partitionAnimation(t, (i+0.5)*0.1, (i+1.5)*0.1);
    }

    for (var i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].style.opacity = Animator.partitionAnimation(t, 0.9, 1.0);
    }
  };

  Testing.prototype.toggle = function() {
    var promise = null;
    if (this.animator.playDirection == 1) {
      promise = this.animator.playBackwards();
    } else {
      promise = this.animator.playForward();
    }
    var self = this;
    promise.then(function() {
      if (self.visible) {
        self.toggle();
      }
    });
  };


  var testing = new Testing();

  window.allSlides["slide_testing"] = testing;

})();
