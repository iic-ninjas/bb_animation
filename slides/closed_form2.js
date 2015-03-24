window.allSlides = window.allSlides || {};

(function() {

  function ClosedForm2() {
  }

  ClosedForm2.prototype.init = function(container) {
    this.container = container;
    this.el = container.querySelector(".box");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.animator.setVal(0);
  };

  ClosedForm2.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  ClosedForm2.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  ClosedForm2.prototype.animate = function(t) {
    this.el.style.width = Animator.lerp(t, 100, 300) + "px";
  };

  ClosedForm2.prototype.toggle = function() {
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


  var closedForm2 = new ClosedForm2();
  var closedForm3 = new ClosedForm2();

  window.allSlides["slide_closed_form2"] = closedForm2;
  window.allSlides["slide_closed_form3"] = closedForm3;

})();

