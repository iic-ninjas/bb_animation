window.allSlides = window.allSlides || {};

(function() {

  function a(t, s) {
    return t * t * ((s + 1) * t - s);
  }

  function o(t, s) {
    return t * t * ((s + 1) * t + s);
  }

  function anticipateOvershoot(t) {
    if (t < 0.5) return 0.5 * a(t * 2.0, 3);
    else return 0.5 * (o(t * 2.0 - 2.0, 3) + 2.0);
  }

  function TransformT() {
  }

  TransformT.prototype.init = function(container) {
    this.container = container;
    this.ease = container.querySelector(".box.ease");
    this.easeCurve = container.querySelector(".ease_curve");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.animator.setVal(1);

    drawCurve(this.easeCurve.getContext("2d"),
              parseInt(this.easeCurve.getAttribute("width")),
              parseInt(this.easeCurve.getAttribute("height")),
              function(t) { return anticipateOvershoot(t); },
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
    t = Animator.partitionAnimation(t, 0.2, 0.8);
    this.ease.style.left = Animator.lerp(anticipateOvershoot(t), 0, 200) + "px";
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

  window.allSlides["slide_transforming_t2"] = transformT;

})();

