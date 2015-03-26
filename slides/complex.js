window.allSlides = window.allSlides || {};

(function() {

  function Complex() {
  }

  Complex.prototype.init = function(container) {
    this.container = container;
    this.b1 = container.querySelector(".b1");
    this.b2 = container.querySelector(".b2");
    this.textContainer = container.querySelector(".text");
    this.visible = false;
    this.text = "Hello world!";
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.animator.setVal(0);
  };

  Complex.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  Complex.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  Complex.prototype.animate = function(t) {
    t = Animator.partitionAnimation(t, 0.1, 0.9);
    this.b1.style.left = Animator.lerp(t, 0, 500);
    this.b1.style["border-radius"] = Animator.lerp(t, 50, 0) + "px";
    this.b2.style.left = Animator.lerp(1-t, 0, 500);
    this.textContainer.textContent = this.text.substring(0, Math.round(Animator.lerp(t, 0, this.text.length)));
  };

  Complex.prototype.toggle = function() {
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


  var complex = new Complex();

  window.allSlides["slide_complex"] = complex;

})();


