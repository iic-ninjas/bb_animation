window.allSlides = window.allSlides || {};

(function() {

  function Beyond() {
  }

  Beyond.prototype.init = function(container) {
    this.container = container;
    this.el = container.querySelector(".box");
    this.curve = container.querySelector(".curve");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(1400);
    this.animator.setVal(1);

    drawCurve(this.curve.getContext("2d"),
              parseInt(this.curve.getAttribute("width")),
              parseInt(this.curve.getAttribute("height")),
              this.ease,
              0, 1);
  };

  Beyond.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  Beyond.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  Beyond.prototype.animate = function(t) {
    this.el.style.left = Animator.lerp(this.ease(t), 0, 400) + "px";
  };

  Beyond.prototype.toggle = function() {
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

  Beyond.prototype.ease = function(t) {
    return 0.45 + Math.sin(1.5*t*Math.PI + Math.PI*1.25)*0.6;
  };


  var beyond = new Beyond();

  window.allSlides["slide_beyond"] = beyond;

})();


