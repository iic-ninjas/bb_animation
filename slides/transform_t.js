window.allSlides = window.allSlides || {};

(function() {

  function TransformT() {
  }

  TransformT.prototype.init = function(container) {
    this.container = container;
    this.linear = container.querySelector(".box.linear");
    this.ease = container.querySelector(".box.ease");
    this.sin = container.querySelector(".box.sin");
    this.linearCurve = container.querySelector(".linear_curve");
    this.easeCurve = container.querySelector(".ease_curve");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(700);
    this.animator.setVal(1);

    drawCurve(this.linearCurve.getContext("2d"),
              parseInt(this.linearCurve.getAttribute("width")),
              parseInt(this.linearCurve.getAttribute("height")),
              function(t) { return t; },
              0, 1);

    drawCurve(this.easeCurve.getContext("2d"),
              parseInt(this.easeCurve.getAttribute("width")),
              parseInt(this.easeCurve.getAttribute("height")),
              function(t) { return t*t*t*t*t; },
              0, 1);
  };

  TransformT.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  TransformT.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  TransformT.prototype.animate = function(t) {
    this.linear.style.left = Animator.lerp(t, 0, 200) + "px";
    this.ease.style.left = Animator.lerp(t*t*t*t*t, 0, 200) + "px";
  };

  TransformT.prototype.toggle = function() {
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


  var transformT = new TransformT();

  window.allSlides["slide_transforming_t"] = transformT;

})();

